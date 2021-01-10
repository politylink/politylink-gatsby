import React from "react"
import {graphql} from "gatsby"
import styles from "./committee.module.css"
import {Container, ExpandableContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import MinutesCard from "../components/minutesCard";
import {formatTopicSentence} from "../utils/formatutils";
import {formatDate} from "../utils/dateutils";
import {sortMinutesList} from "../utils/sortutils";
import {buildPath} from "../utils/urlutils";
import {getCommitteeDescription} from "../utils/seoutils";
import {EXPAND_MINUTES_KEY} from "../utils/constants";
import Share from "../components/share";
import ParentPath from "../components/parentPath";


export default function Committee({data}) {
    const committee = data.politylink.Committee[0]
    const minutesList = sortMinutesList(committee.minutes, true)

    return (
        <Layout>
            <SEO title={committee.name} description={getCommitteeDescription(committee)}/>
            <Container><ParentPath to={'/committees'} text={'委員会一覧'}/></Container>
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

            {minutesList.length > 0 &&
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
                            date={formatDate(minutes.startDateTime)}
                        />
                    })}
                </ExpandableContainer>
            </div>
            }

            <Container><Share title={committee.name} postPath={buildPath(committee.id)}/></Container>
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
                    totalNews
                    startDateTime{ year, month, day, formatted }
                }
            }
        }
    }
`