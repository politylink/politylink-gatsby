import React from "react"
import {graphql} from "gatsby"
import styles from "./committee.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import MinutesCard from "../components/minutesCard";
import {formatDate, formatSentence} from "../utils/format";
import {sortMinutesList} from "../utils/sort";
import {buildPath} from "../utils/url";
import {getCommitteeDescription} from "../utils/seoutils";


export default function Committees({data}) {
    const committee = data.politylink.Committee[0]
    const minutesList = sortMinutesList(committee.minutes, true)

    return (
        <Layout>
            <SEO title={committee.name} description={getCommitteeDescription(committee)}/>
            <Container>
                <h2 className={styles.name}>{committee.name}</h2>
                <div className={styles.description}>
                    <p>{committee.description}</p>
                    {committee.topics != null &&
                    <Container>
                        {committee.topics.map((topic) => {
                            return <p className={styles.topic}>{formatSentence(topic)}</p>
                        })}
                    </Container>}
                </div>


                <p className={styles.section}>会議録一覧</p>
                <div className={styles.committees}>
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
            </Container>
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