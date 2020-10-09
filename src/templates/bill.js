import React from "react"
import {graphql} from 'gatsby'
import styles from "./bill.module.css"
import ProgressBadge from "../components/progress"
import {Container, FlexContainer} from "../components/container"
import LinkCard from "../components/linkCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MinutesCard from "../components/minutesCard"
import {formatDate} from "../utils/format"
import {buildPath} from "../utils/url";
import {getBillDescription} from "../utils/seoutils";
import {sortMinutesList, sortNewsList} from "../utils/sort";
import NewsCard from "../components/newsCard";

export const formatArrowDate = (date) => {
    if (date == null || date.year == null || date.month == null || date.day == null) {
        return '-'
    }
    return String(date.year) + "\n" + String(date.month).padStart(2, '0') + "/" + String(date.day).padStart(2, '0')
}

export default function Bill({data}) {
    const bill = data.politylink.Bill[0]
    let arrows
    if (bill.firstHouse === "REPRESENTATIVES") {
        arrows = [
            {"title": "提出", "value": formatArrowDate(bill.submittedDate), "color": 0},
            {"title": '衆議院\n委員会', "value": formatArrowDate(bill.passedRepresentativesCommitteeDate), "color": 1},
            {"title": "衆議院\n本会議", "value": formatArrowDate(bill.passedRepresentativesDate), "color": 2},
            {"title": "参議院\n委員会", "value": formatArrowDate(bill.passedCouncilorsCommitteeDate), "color": 3},
            {"title": "参議院\n本会議", "value": formatArrowDate(bill.passedCouncilorsDate), "color": 4},
            {"title": "公布", "value": formatArrowDate(bill.proclaimedDate), "color": 5},
        ]
    } else {
        arrows = [
            {"title": "提出", "value": formatArrowDate(bill.submittedDate), "color": 0},
            {"title": "参議院\n委員会", "value": formatArrowDate(bill.passedCouncilorsCommitteeDate), "color": 1},
            {"title": "参議院\n本会議", "value": formatArrowDate(bill.passedCouncilorsDate), "color": 2},
            {"title": '衆議院\n委員会', "value": formatArrowDate(bill.passedRepresentativesCommitteeDate), "color": 3},
            {"title": "衆議院\n本会議", "value": formatArrowDate(bill.passedRepresentativesDate), "color": 4},
            {"title": "公布", "value": formatArrowDate(bill.proclaimedDate), "color": 5},
        ]
    }
    const minutesList = sortMinutesList(bill.beDiscussedByMinutes)
    const newsList = sortNewsList(bill.news)

    return (
        <Layout>
            <SEO title={bill.name} description={getBillDescription(bill)}/>
            <Container>
                <h2 className={styles.name}>{bill.name}</h2>
                {bill.aliases && bill.aliases.length > 0 &&
                <p className={styles.aliases}>通称: {bill.aliases.join(", ")}</p>}
                <h3 className={styles.number}>{bill.billNumber}</h3>
                <p className={styles.reason}>{bill.reason}</p>
                <ProgressBadge arrows={arrows}/>
                <p className={styles.section}>公式リンク</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {bill.urls.map((url) => {
                            return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                        })}
                    </FlexContainer>
                </div>

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
    query($billId: ID!){
        politylink {
            Bill(filter:{id:$billId}){
                name
                aliases
                billNumber
                reason
                firstHouse
                urls {
                    url
                    title
                    domain
                }
                beDiscussedByMinutes{
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
                submittedDate { year, month, day }
                passedRepresentativesCommitteeDate { year, month, day }
                passedRepresentativesDate { year, month, day }
                passedCouncilorsCommitteeDate { year, month, day }
                passedCouncilorsDate { year, month, day }
                proclaimedDate { year, month, day }
            }
        }
    }
`