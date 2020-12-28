import React from "react"
import {graphql} from "gatsby"
import styles from "./member.module.css"
import {Container, ExpandableContainer, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import {getMemberDescription} from "../utils/seoutils";
import LinkCard from "../components/linkCard";
import {sortMinutesList} from "../utils/sortutils";
import {EXPAND_MINUTES_KEY} from "../utils/constants";
import MinutesCard from "../components/minutesCard";
import {buildPath} from "../utils/urlutils";
import {formatDate} from "../utils/dateutils";


export default function Member({data}) {
    const member = data.politylink.Member[0]
    const house = member.house === 'REPRESENTATIVES' ? '衆' : '参'
    const tags = [house].concat(member.tags)
    const minutesList = sortMinutesList(member.attendedMinutes)

    return (
        <Layout>
            <SEO title={member.name} description={getMemberDescription(member)}/>
            <div className={styles.section}>
                <Container>
                    <div className={styles.imageDiv}>
                        <img className={styles.image} src={member.image} alt={'顔写真'}/>
                    </div>
                    <FlexContainer>
                        <h2 className={styles.name}>{member.name}</h2>
                        <p className={styles.tags}>{tags.join('・')}</p>
                    </FlexContainer>
                    <div className={styles.description}>
                        <p>{member.description}</p>
                    </div>
                </Container>
            </div>

            <div className={styles.section}>
                <FlexContainer
                    title={"公式リンク"}
                >
                    {member.urls.map((url) => {
                        return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                    })}
                </FlexContainer>
            </div>

            {minutesList.length > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"国会での発言"}
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
            }
        </Layout>
    )
}

export const query = graphql`
    query ($memberId: ID!){
        politylink{
            Member(filter:{id:$memberId}){
                id
                name
                image
                description
                house
                tags
                urls {
                    url
                    title
                    domain
                }
                attendedMinutes {
                    id
                    name
                    topics
                    totalNews
                    startDateTime { year, month, day, formatted }
                }
            }
        }
    }
`