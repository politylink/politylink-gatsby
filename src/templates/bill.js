import React from "react"
import {graphql} from 'gatsby'
import styles from "./bill.module.css"
import ProgressBadge from "../components/progress"
import {
    Container,
    ExpandableContainer,
    FlexContainer,
    SinglePaneContainer,
    TwoPaneContainer
} from "../components/container"
import LinkCard from "../components/linkCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MinutesCard from "../components/minutesCard"
import {formatDate, formatDateWithDay} from "../utils/dateutils"
import {buildImagePath, buildPath} from "../utils/urlutils";
import {getBillDescription} from "../utils/seoutils";
import {sortBillUrlList, sortMinutesList, sortNewsList} from "../utils/sortutils";
import NewsCard from "../components/newsCard";
import {EXPAND_MINUTES_KEY, EXPAND_NEWS_KEY} from "../utils/constants";
import Share from "../components/share";
import ParentPath from "../components/parentPath";

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
    const urlList = sortBillUrlList(bill.urls)

    return (
        <Layout>
            <SEO image={buildImagePath(bill.id, 'png')} twitterType={`summary_large_image`}
                 title={bill.name} description={getBillDescription(bill)}/>
            <SinglePaneContainer>
                <ParentPath to={'/bills'} text={'法律案一覧'}/>
            </SinglePaneContainer>
            <TwoPaneContainer>
                <Container>
                    <div className={styles.section}>
                        <Container>
                            <h2 className={styles.name}>{bill.name}</h2>
                            {bill.aliases && bill.aliases.length > 0 &&
                            <p className={styles.aliases}>通称: {bill.aliases.join(", ")}</p>}
                            <h3 className={styles.number}>{bill.billNumber}</h3>
                            <p className={styles.reason}>{bill.reason}</p>
                            <ProgressBadge arrows={arrows}/>
                        </Container>
                    </div>

                    <div className={styles.section}>
                        <FlexContainer
                            title={"リンク"}
                        >
                            {urlList.map((url) => {
                                return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                            })}
                        </FlexContainer>
                    </div>
                </Container>

                {(minutesList.length > 0 || newsList.length > 0) &&
                <Container>
                    {minutesList.length > 0 &&
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
                                    date={formatDateWithDay(minutes.startDateTime)}
                                    wordcloud={minutes.wordcloud}
                                    billActions={minutes.billActions}
                                />
                            })}
                        </ExpandableContainer>
                    </div>}

                    {newsList.length > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"関連ニュース"}
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
                                />
                            })}
                        </ExpandableContainer>
                    </div>}
                </Container>}
            </TwoPaneContainer>
            <SinglePaneContainer>
                <Share title={bill.name} postPath={buildPath(bill.id)}/>
            </SinglePaneContainer>
        </Layout>
    )
}

export const query = graphql`
    query($billId: ID!){
        politylink {
            Bill(filter:{id:$billId}){
                id
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
                    wordcloud
                    totalNews
                    startDateTime { year, month, day, formatted }
                    billActions(filter:{belongedToBill:{id:$billId}}) {
                        type
                        belongedToSpeech {
                            orderInMinutes
                        }
                    }
                }
                news {
                    id
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