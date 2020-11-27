import React from "react"
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./timeline.module.css"
import {Container, ExpandableContainer} from "../components/container"
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

            <div className={styles.section}>
                <Container>
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
                </Container>
            </div>

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
                        />
                    })}
                </ExpandableContainer>
            </div>
            }

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
            </div>
            }

            {timeline.totalNews > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"今日のニュース"}
                    localStorageKey={EXPAND_NEWS_KEY}
                    sizeLimit={2}
                >
                    {newsList.map((news) => {
                        return <NewsCard
                            href={news.url}
                            thumbnail={news.thumbnail}
                            title={news.title}
                            publisher={news.publisher}
                            publishedAt={formatDate(news.publishedAt)}
                            isPaid={news.isPaid}
                        />
                    })}
                </ExpandableContainer>
            </div>
            }
        </Layout>
    )
}

export const query = graphql`
    query($timelineId: ID!){
        politylink {
            Timeline(filter:{id:$timelineId}){
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
                    totalNews
                    startDateTime {year, month, day, formatted}
                }
                news {
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