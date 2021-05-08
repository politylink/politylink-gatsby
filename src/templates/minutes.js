import React from "react"
import {graphql, Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./minutes.module.css"
import {
    Container,
    ExpandableContainer,
    FlexContainer,
    SinglePaneContainer,
    TwoPaneContainer
} from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkCard from "../components/linkCard"
import BillCard from "../components/billCard"
import {formatLongSentence, formatTopicSentence} from "../utils/formatutils"
import {buildPath} from "../utils/urlutils";
import {getMinutesDescription} from "../utils/seoutils";
import NewsCard from "../components/newsCard";
import {sortMinutesUrlList, sortNewsList} from "../utils/sortutils";
import {formatDate, formatDateWithDay, toJsDate, toTimelineId} from "../utils/dateutils";
import {EXPAND_BILL_KEY, EXPAND_MEMBER_KEY, EXPAND_NEWS_KEY} from "../utils/constants";
import MemberCard from "../components/memberCard";
import Share from "../components/share";
import ParentPath from "../components/parentPath";
import MinutesTimelineCard from "../components/minutesTimelineCard";


export default function Minutes({data}) {

    const getMemberCards = (minutes) => {
        if (minutes.speakers != null) {
            return minutes.speakers.map((text, index) => {
                const name = text.split('(')[0];
                const id = minutes.speakerIds[index];
                const member = minutes.beAttendedByMembers.find(member => member.id === id);
                if (member) {
                    return <MemberCard title={name} id={id} tags={member.tags} house={member.house} to={buildPath(id)}/>
                } else {
                    return null;
                }
            }).filter(e => e);
        }

        // ToDo: remove after backfilling minutes.speakers
        if (minutes.beAttendedByMembers != null) {
            return minutes.beAttendedByMembers.map((member) => {
                return <MemberCard title={member.name} id={member.id} tags={member.tags} house={member.house} to={buildPath(member.id)}/>;
            })
        }

        return [];
    }

    const minutes = data.politylink.Minutes[0]
    const newsList = sortNewsList(minutes.news)
    const urlList = sortMinutesUrlList(minutes.urls)
    const committeePath = minutes.belongedToCommittee === null ? null : buildPath(minutes.belongedToCommittee.id)
    const memberCards = getMemberCards(minutes)

    return (
        <Layout>
            <SEO title={minutes.name} description={getMinutesDescription(minutes)}/>
            {!(committeePath == null) &&
            <SinglePaneContainer><ParentPath to={committeePath} text={'会議録一覧'}/></SinglePaneContainer>}

            <TwoPaneContainer>
                <Container>
                    <div className={styles.section}>
                        <Container>
                            {committeePath == null
                                ? <h2 className={styles.name}>{minutes.name}</h2>
                                : <Link className={styles.link} to={committeePath}>
                                    <h2 className={styles.name}>{minutes.name}</h2>
                                </Link>}
                            <Link className={styles.link} to={buildPath(toTimelineId(toJsDate(minutes.startDateTime)))}>
                                <p className={styles.date}>
                                    <FontAwesomeIcon icon="calendar-alt"/> {formatDateWithDay(minutes.startDateTime)}
                                </p>
                            </Link>
                        </Container>
                    </div>

                    {minutes.wordcloud != null &&
                    <div className={styles.section}>
                        <Container>
                            <img className={styles.wordcloud} src={minutes.wordcloud} alt={minutes.id}/>
                        </Container>
                    </div>}

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
                            title={"リンク"}
                        >
                            {urlList.map((url) => {
                                return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                            })}
                        </FlexContainer>
                    </div>

                    {memberCards.length > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={minutes.speakers != null ? "説明・質疑者" : "発言者"}
                            localStorageKey={EXPAND_MEMBER_KEY}
                            sizeLimit={7}
                        >
                            {memberCards}
                        </ExpandableContainer>
                    </div>}
                </Container>

                {(minutes.discussedBills.length > 0 || newsList.length > 0 || minutes.billActions.length > 0) &&
                <Container>
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
                    </div>}

                    {minutes.billActions.length > 0 &&
                    <div className={styles.section}>
                        <Container title={"タイムライン"}>
                            <div className={styles.timeline}>
                                <MinutesTimelineCard
                                    billActions={minutes.billActions}
                                />
                            </div>
                        </Container>
                    </div>
                    }

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

            <SinglePaneContainer><Share title={minutes.name} postPath={buildPath(minutes.id)}/></SinglePaneContainer>
        </Layout>
    )
}

export const query = graphql`
    query($minutesId: ID!){
        politylink {
            Minutes(filter:{id:$minutesId}){
                id
                name
                summary
                topics
                speakers
                speakerIds
                wordcloud
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
                    tags
                    house
                }
                billActions{
                    type
                    belongedToSpeech {
                        orderInMinutes
                        ndlUrl
                    }
                    belongedToBill {
                        name
                        id
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
                startDateTime { year, month, day }
            }
        }
    }
`
