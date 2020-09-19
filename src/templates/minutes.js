import React from "react"
import {graphql} from "gatsby"
import styles from "./minutes.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkCard from "../components/linkCard"
import BillCard from "../components/billCard"
import {formatDate, formatSentence} from "../utils/format"


export default function Minutes({data}) {
    const minutes = data.politylink.Minutes[0]
    const description = formatDate(minutes.startDateTime) + "開催の" + minutes.name + "に関する情報をまとめています。"

    return (
        <Layout>
            <SEO title={minutes.name} description={description}/>
            <Container>
                <h2 className={styles.name}>{minutes.name}</h2>
                <h3 className={styles.number}>{formatDate(minutes.startDateTime)}</h3>
                <div className={styles.summary}>
                    <p>{minutes.summary}</p>
                    <Container>
                        {minutes.topics.filter(topic => topic != null).map((topic) => {
                            return <p className={styles.topic}> {formatSentence(topic)} </p>
                        })}
                    </Container>
                </div>

                <p className={styles.section}>公式リンク</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {minutes.urls.map((url) => {
                            return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                        })}
                    </FlexContainer>
                </div>

                <p className={styles.section}>関連議案</p>
                <div className={styles.bills}>
                    <FlexContainer>
                        {minutes.discussedBills.map((bill) => {
                            return <BillCard
                                title={bill.billNumber}
                                description={bill.name}
                                to={"/bill/" + bill.id.split(':').pop()}
                                left={true}
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
                summary
                topics
                urls{
                    url
                    title
                    domain
                }
                discussedBills{
                    id
                    name
                    billNumber
                }
                startDateTime { year, month, day }
            }
        }
    }
`