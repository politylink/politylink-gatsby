import React from "react"
import {graphql, Link} from "gatsby"
import styles from "./timeline.module.css"
import {Container, ExpandableContainer} from "../components/container"
import Layout from "../components/layout"
import BillCard from "../components/billCard"
import {formatDate, formatDateWithDay} from "../utils/format"
import {buildPath} from "../utils/url";
import NewsCard from "../components/newsCard";
import {sortBillList, sortMinutesList, sortNewsList} from "../utils/sort";
import MinutesCard from "../components/minutesCard";
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {EXPAND_BILL_KEY, EXPAND_MINUTES_KEY, EXPAND_NEWS_KEY} from "../utils/constants";
import {offsetDate, toJsDate, toTimelineId} from "../utils/dateutils";
import {getTimelineDescription, getTimelineTitle} from "../utils/seoutils";
import SEO from "../components/seo";


export default function Timeline({data}) {
    const timeline = data.politylink.Timeline[0]
    const prevDate = offsetDate(toJsDate(timeline.date), -1);
    const nextDate = offsetDate(toJsDate(timeline.date), 1);
    const minutesList = sortMinutesList(timeline.minutes)
    const billList = sortBillList(timeline.bills)
    const newsList = sortNewsList(timeline.news)

    return (
        <Layout>
            <SEO title={getTimelineTitle(timeline)} description={getTimelineDescription(timeline)}/>
            <Container>
                <div className={styles.header}>
                    <Link to={buildPath(toTimelineId(prevDate))} className={styles.nav}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} className={styles.navicon}/>
                    </Link>
                    <h3 className={styles.name}>{formatDateWithDay(timeline.date)}</h3>
                    <Link to={buildPath(toTimelineId(nextDate))} className={styles.nav}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </Link>
                </div>

                <p className={styles.section}>{`会議録（${timeline.totalMinutes}件）`}</p>
                <div className={styles.minutes}>
                    <ExpandableContainer
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

                <p className={styles.section}>{`関連議案（${timeline.totalBills}件）`}</p>
                <div className={styles.bills}>
                    <ExpandableContainer
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

                <p className={styles.section}>{`関連ニュース（${timeline.totalNews}件）`}</p>
                <div className={styles.news}>
                    <ExpandableContainer
                        localStorageKey={EXPAND_NEWS_KEY}
                        sizeLimit={3}
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
            </Container>
        </Layout>
    )
}

export const query = graphql`
    query($timelineId: ID!){
        politylink {
            Timeline(filter:{id:$timelineId}){
                date { year, month, day }
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
                    submittedDate { formatted }
                }
                minutes {
                    id
                    name
                    topics
                    totalNews
                    startDateTime { year, month, day, formatted }
                }
                news {
                    title
                    url
                    isPaid
                    publisher
                    thumbnail
                    publishedAt { year, month, day, formatted }
                }
            }
        }
    }
`