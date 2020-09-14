import React from "react"
import {graphql} from "gatsby"
import styles from "./minutes.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import LinkCard from "../components/linkCard";
import LinkPersonCard from "../components/linkPersonCard";
import DiscussedBillCard from "../components/discussedBillCard";


export const formatStartDate = (date) => {
    if (date == null || date.year == null || date.month == null || date.day == null) {
        return '-'
    }
    return String(date.year) + "/" + String(date.month).padStart(2, '0') + "/" + String(date.day).padStart(2, '0')
}

export const formatTopic = (topic) => {
    if (topic == null) {
        return ''
    }

    return "- " + topic
}

export default function Minutes({data}) {
    const minutes = data.politylink.Minutes[0]

    return (
        <Layout>
            <SEO title={minutes.name}/>
            <Container>
                <h2 className={styles.name}>{minutes.name}</h2>
                <h3 className={styles.number}>{formatStartDate(minutes.startDateTime)}</h3>
                <p className={styles.summary}>{minutes.summary}</p>
                <div className={styles.topic}>
                <FlexContainer>
                        {minutes.topics.map((topic) => {
                            return <p> {formatTopic(topic)} </p>
                        })}
                    </FlexContainer>
                </div>
                <p className={styles.section}>公式リンク</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {minutes.urls.map((url) => {
                            return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                        })}
                    </FlexContainer>
                </div>
                <p className={styles.section}>発言者</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {minutes.urls.map((url) => {
                            return <LinkPersonCard href={url.url} title={"小泉進次郎"}/>
                        })}
                    </FlexContainer>
                </div>
                <p className={styles.section}>関連議案</p>
                <div className={styles.bills}>
                    <FlexContainer>
                        {minutes.discussedBills.map((bill) => {
                            return <DiscussedBillCard
                                billNumber={bill.billNumber}
                                name={bill.name}
                                to={'/'}
                            />
                        })}
                    </FlexContainer>
                </div>

            </Container>
        </Layout>
    )
}

export const query = graphql`
    query($minutesId: ID!){
        politylink {
            Minutes(filter:{id:$minutesId}){
                name
                startDateTime{
                    year
                    month
                    day
                }
                summary
                topics
                urls{
                    url
                    title
                    domain
                }
                discussedBills{
                    name
                    billNumber
                }
            }
        }
    }
`