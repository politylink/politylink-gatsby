import React from "react"
import {graphql} from "gatsby"
import styles from "./timeline.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout"
import BillCard from "../components/billCard"
import {formatDate} from "../utils/format"
import {buildPath} from "../utils/url";
import NewsCard from "../components/newsCard";
import {sortMinutesList, sortNewsList} from "../utils/sort";
import MinutesCard from "../components/minutesCard";


export default function Timeline({data}) {
    const timeline = data.politylink.Timeline[0]
    const billList = timeline.bills
    const minutesList = sortMinutesList(timeline.minutes)
    const newsList = sortNewsList(timeline.news)

    return (
        <Layout>
            <Container>
                <h2 className={styles.name}>{formatDate(timeline.date)}</h2>

                {minutesList.length > 0 &&
                <p className={styles.section}>会議録</p>
                }
                <div className={styles.minutes}>
                    <FlexContainer>
                        {minutesList.map((minutes) => {
                            return <MinutesCard
                                to={buildPath(minutes.id)}
                                name={minutes.name}
                                topics={minutes.topics}
                                hasNews={minutes.totalNews > 0}
                                date={formatDate(minutes.startDateTime)}
                            />
                        })}
                    </FlexContainer>
                </div>

                {billList.length > 0 &&
                <p className={styles.section}>関連議案</p>
                }
                <div className={styles.bills}>
                    <FlexContainer>
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
                    </FlexContainer>
                </div>

                {newsList.length > 0 &&
                <p className={styles.section}>関連ニュース</p>
                }
                <div className={styles.news}>
                    <FlexContainer>
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
                    </FlexContainer>
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
                bills {
                    id
                    name
                    billNumber
                    isPassed
                    aliases
                    totalNews
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