import React from "react"
import {graphql} from "gatsby"
import styles from "./committee.module.css"
import {Container, ExpandableContainer, SinglePaneContainer, TwoPaneContainer} from "../components/layouts/container"
import Layout from "../components/layouts/layout";
import SEO from "../components/seo";
import MinutesCard from "../components/cards/minutesCard";
import {formatTopicSentence} from "../utils/formatUtils";
import {formatDateWithDay} from "../utils/dateUtils";
import {sortMinutesList} from "../utils/sortUtils";
import {buildPath} from "../utils/urlUtils";
import {getCommitteeDescription} from "../utils/seoUtils";
import {EXPAND_MINUTES_KEY} from "../utils/constants";
import Share from "../components/share";
import ParentPath from "../components/navigations/parentPath";


export default function Committee({data}) {
    const committee = data.politylink.Committee[0]
    const minutesList = sortMinutesList(committee.minutes, true)

    return (
        <Layout>
            <SEO title={committee.name} description={getCommitteeDescription(committee)}/>
            <SinglePaneContainer><ParentPath to={'/committees'} text={'委員会一覧'}/></SinglePaneContainer>

            <TwoPaneContainer>
                <Container>
                    <div className={styles.section}>
                        <Container>
                            <h2 className={styles.name}>{committee.name}</h2>
                            <div className={styles.description}>
                                <p>{committee.description}</p>
                                {committee.topics != null &&
                                <Container>
                                    {committee.topics.map((topic) => {
                                        return <p className={styles.topic}>{formatTopicSentence(topic)}</p>
                                    })}
                                </Container>}
                            </div>
                        </Container>
                    </div>
                </Container>

                {minutesList.length > 0 &&
                <Container>
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"会議録一覧"}
                            localStorageKey={EXPAND_MINUTES_KEY}
                            sizeLimit={5}
                        >
                            {minutesList.map((minutes) => {
                                return <MinutesCard
                                    to={buildPath(minutes.id)}
                                    key={minutes.id}
                                    name={minutes.name}
                                    topics={minutes.topics}
                                    hasNews={minutes.totalNews > 0}
                                    date={formatDateWithDay(minutes.startDateTime)}
                                    wordcloud={minutes.wordcloud}
                                />
                            })}
                        </ExpandableContainer>
                    </div>
                </Container>}
            </TwoPaneContainer>

            <SinglePaneContainer>
                <Share title={committee.name} postPath={buildPath(committee.id)}/>
            </SinglePaneContainer>
        </Layout>
    )
}

export const query = graphql`
    query ($committeeId: ID!){
        politylink{
            Committee(filter:{id:$committeeId}){
                id
                name
                aliases
                description
                topics
                minutes{
                    id
                    name
                    topics
                    wordcloud
                    totalNews
                    startDateTime{ year, month, day, formatted }
                }
            }
        }
    }
`