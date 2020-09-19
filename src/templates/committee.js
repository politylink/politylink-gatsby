import React from "react"
import {graphql} from "gatsby"
import styles from "./committee.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import MinutesCard from "../components/minutesCard";
import {formatMatter, formatMinutesDate, SortByStartDateTime} from "./utils";


export default function Committees({data}) {
    const committee = data.politylink.Committee[0]
    const description = committee.name + "に関する情報をまとめています。"
    const minutes = SortByStartDateTime(committee.minutes, true)

    return (
        <Layout>
            <SEO title={committee.name} description={description}/>
            <Container>
                <h2 className={styles.name}>{committee.name}</h2>
                <div className={styles.matters}>
                    <Container>
                        {committee.matters.filter(matter => matter != null).map((matter) => {
                            return <p className={styles.matter}>{formatMatter(matter)}</p>
                        })}
                    </Container>
                </div>


                <p className={styles.section}>会議録一覧</p>
                <div className={styles.committees}>
                    <FlexContainer>
                        {minutes.map((minutes) => {
                            return <MinutesCard
                                to={"/minutes/" + minutes.id.split(':').pop()}
                                name={minutes.name}
                                topics={minutes.topics}
                                date={formatMinutesDate(minutes.startDateTime)}
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
                matters
                minutes{
                    id
                    name
                    topics
                    startDateTime{ year, month, day }
                }
            }
        }
    }
`