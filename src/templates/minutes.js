import React from "react"
import {graphql, Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./minutes.module.css"
import {Container, ExpandableContainer, FlexContainer} from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkCard from "../components/linkCard"
import BillCard from "../components/billCard"
import CommitteeCard from "../components/committeeCard";
import {formatLongSentence, formatTopicSentence} from "../utils/formatutils"
import {buildPath} from "../utils/urlutils";
import {getMinutesDescription} from "../utils/seoutils";
import NewsCard from "../components/newsCard";
import {sortNewsList} from "../utils/sortutils";
import {formatDate, formatDateWithDay, toJsDate, toTimelineId} from "../utils/dateutils";
import {EXPAND_BILL_KEY, EXPAND_MEMBER_KEY, EXPAND_NEWS_KEY} from "../utils/constants";
import MemberCard from "../components/memberCard";
import Share from "../components/share";


export default function Minutes({data}) {
    const minutes = data.politylink.Minutes[0]
    const newsList = sortNewsList(minutes.news)
    const siteUrl = data.site.siteMetadata.siteUrl

    return (
        <Layout>
            <SEO title={minutes.name} description={getMinutesDescription(minutes)}/>
            <div className={styles.section}>
                <Container>
                    <h2 className={styles.name}>{minutes.name}</h2>
                    <Share postPath={buildPath(minutes.id)} title={minutes.name} siteUrl={siteUrl} />
                    <Link className={styles.timeline} to={buildPath(toTimelineId(toJsDate(minutes.startDateTime)))}>
                        <p className={styles.date}>
                            <FontAwesomeIcon icon="calendar-alt"/> {formatDateWithDay(minutes.startDateTime)}
                        </p>
                    </Link>
                </Container>
            </div>

            <div className={styles.section}>
                <Container className={styles.section}>
                    <div className={styles.summary}>
                        {minutes.summary != null &&
                        <p>{formatLongSentence(minutes.summary, 150)}</p>
                        }
                        {minutes.topics != null &&
                        <Container>
                            {minutes.topics.map((topic) => {
                                return <p className={styles.topic}> {formatTopicSentence(topic)} </p>
                            })}
                        </Container>}
                    </div>
                </Container>
            </div>

            <div className={styles.section}>
                <FlexContainer
                    title={"公式リンク"}
                >
                    {minutes.urls.map((url) => {
                        return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                    })}
                </FlexContainer>
            </div>

            {minutes.belongedToCommittee != null &&
            <div className={styles.section}>
                <FlexContainer
                    title={"所属委員会"}
                >
                    <CommitteeCard
                        title={minutes.belongedToCommittee.name}
                        to={buildPath(minutes.belongedToCommittee.id)}
                        left={true}
                    />
                </FlexContainer>
            </div>
            }

            {minutes.beAttendedByMembers.length > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"発言者"}
                    localStorageKey={EXPAND_MEMBER_KEY}
                    sizeLimit={6}
                >
                    {minutes.beAttendedByMembers.map((member) => {
                        return <MemberCard
                            title={member.name}
                            to={buildPath(member.id)}
                        />;
                    })}
                </ExpandableContainer>
            </div>
            }

            {minutes.discussedBills.length > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"法律案"}
                    localStorageKey={EXPAND_BILL_KEY}
                    sizeLimit={2}
                >
                    {minutes.discussedBills.map((bill) => {
                        return <BillCard
                            title={bill.billNumber}
                            description={bill.name}
                            aliases={bill.aliases}
                            to={buildPath(bill.id)}
                            isPassed={bill.isPassed}
                            left={true}
                        />
                    })}
                </ExpandableContainer>
            </div>
            }

            {newsList.length > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"関連ニュース"}
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
    query($minutesId: ID!){
        politylink {
            Minutes(filter:{id:$minutesId}){
                name
                id
                summary
                topics
                urls{
                    url
                    title
                    domain
                }
                belongedToCommittee{
                    id
                    name
                }
                discussedBills{
                    id
                    name
                    billNumber
                    isPassed
                    aliases
                }
                beAttendedByMembers{
                    id
                    name
                }
                news {
                    title
                    url
                    isPaid
                    publisher
                    thumbnail
                    publishedAt { year, month, day, formatted }
                }
                startDateTime { year, month, day }
            }
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`