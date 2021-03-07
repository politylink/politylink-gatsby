import React from "react"
import {graphql, Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./timeline.module.css"
import {Container, ExpandableContainer, SinglePaneContainer, TwoPaneContainer} from "../components/container"
import Layout from "../components/layout"
import BillCard from "../components/billCard"
import {buildPath} from "../utils/urlutils";
import NewsCard from "../components/newsCard";
import {sortBillList, sortMinutesList, sortNewsList} from "../utils/sortutils";
import MinutesCard from "../components/minutesCard";
import {EXPAND_BILL_KEY, EXPAND_MINUTES_KEY, EXPAND_NEWS_KEY} from "../utils/constants";
import {formatDate, formatDateWithDay, offsetDate, toJsDate, toTimelineId} from "../utils/dateutils";
import {getTimelineDescription, getTimelineTitle} from "../utils/seoutils";
import SEO from "../components/seo";
import Share from "../components/share";


export default function Timeline({data, pageContext}) {
    const timeline = data.politylink.Timeline[0]
    const minDate = toJsDate(pageContext.timelineMinDate);
    const maxDate = toJsDate(pageContext.timelineMaxDate);
    const prevDate = offsetDate(toJsDate(timeline.date), -1);
    const nextDate = offsetDate(toJsDate(timeline.date), 1);
    const minutesList = sortMinutesList(timeline.minutes)
    const billList = sortBillList(timeline.bills)
    const newsList = sortNewsList(timeline.news)

    return (
        <Layout>
            <SEO title={getTimelineTitle(timeline)} description={getTimelineDescription(timeline)}/>

            <SinglePaneContainer>
                <div className={styles.header}>
                    {prevDate >= minDate
                        ? <Link to={buildPath(toTimelineId(prevDate))} className={styles.nav}>
                            <FontAwesomeIcon icon="angle-double-left"/>
                        </Link>
                        : <div className={styles.invalidNav}>
                            <FontAwesomeIcon icon="angle-double-left"/>
                        </div>
                    }
                    <Link to='/timelines' className={styles.nav}>
                        <h3 className={styles.date}>
                            <FontAwesomeIcon icon="calendar-alt"/> {formatDateWithDay(timeline.date)}</h3>
                    </Link>
                    {maxDate >= nextDate
                        ? <Link to={buildPath(toTimelineId(nextDate))} className={styles.nav}>
                            <FontAwesomeIcon icon="angle-double-right"/>
                        </Link>
                        : <div className={styles.invalidNav}>
                            <FontAwesomeIcon icon="angle-double-right"/>
                        </div>
                    }
                </div>
            </SinglePaneContainer>

            <TwoPaneContainer>
                {(timeline.totalMinutes > 0 || timeline.totalBills > 0) &&
                <Container>
                    {timeline.totalMinutes > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"会議録"}
                            localStorageKey={EXPAND_MINUTES_KEY}
                            sizeLimit={2}
                        >
                            {minutesList.map((minutes) => {
                                return <MinutesCard
                                    to={buildPath(minutes.id)}
                                    name={minutes.name}
                                    topics={minutes.topics}
                                    hasNews={minutes.totalNews > 0}
                                    date={formatDate(minutes.startDateTime)}
                                    wordcloud={minutes.wordcloud}
                                />
                            })}
                        </ExpandableContainer>
                    </div>}

                    {timeline.totalBills > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"法律案"}
                            localStorageKey={EXPAND_BILL_KEY}
                            sizeLimit={2}
                        >
                            {billList.map((bill) => {
                                return <BillCard
                                    title={bill.billNumber}
                                    description={bill.name}
                                    aliases={bill.aliases}
                                    to={buildPath(bill.id)}
                                    isPassed={bill.isPassed}
                                    hasNews={bill.totalNews > 0}
                                    left={true}
                                />
                            })}
                        </ExpandableContainer>
                    </div>}
                </Container>}

                {timeline.totalNews > 0 &&
                <Container>
                    {timeline.totalNews > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"今日のニュース"}
                            localStorageKey={EXPAND_NEWS_KEY}
                            sizeLimit={5}
                        >
                            {newsList.map((news) => {
                                return <NewsCard
                                    id={news.id}
                                    href={news.url}
                                    thumbnail={news.thumbnail}
                                    title={news.title}
                                    publisher={news.publisher}
                                    publishedAt={formatDate(news.publishedAt)}
                                    isPaid={news.isPaid}
                                    key={news.id}
                                />
                            })}
                        </ExpandableContainer>
                    </div>}
                </Container>}
            </TwoPaneContainer>

            <SinglePaneContainer>
                <Share title={formatDateWithDay(timeline.date)} postPath={buildPath(timeline.id)}/>
            </SinglePaneContainer>
        </Layout>
    )
}

export const query = graphql`
    query($timelineId: ID!){
        politylink {
            Timeline(filter:{id:$timelineId}){
                id
                date {year, month, day}
                totalBills
                totalMinutes
                totalNews
                bills {
                    id
                    name
                    billNumber
                    isPassed
                    aliases
                    totalNews
                    submittedDate {formatted}
                }
                minutes {
                    id
                    name
                    topics
                    wordcloud
                    totalNews
                    startDateTime {year, month, day, formatted}
                }
                news {
                    id
                    title
                    url
                    isPaid
                    publisher
                    thumbnail
                    publishedAt {year, month, day, formatted}
                }
            }
        }
    }
`