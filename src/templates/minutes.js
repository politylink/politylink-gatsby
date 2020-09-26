import React from "react"
import {graphql} from "gatsby"
import styles from "./minutes.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkCard from "../components/linkCard"
import BillCard from "../components/billCard"
import CommitteeCard from "../components/committeeCard";
import {formatDate, formatSentence} from "../utils/format"
import {buildPath} from "../utils/url";
import {getMinutesDescription} from "../utils/seoutils";


export default function Minutes({data}) {
    const minutes = data.politylink.Minutes[0]

    return (
        <Layout>
            <SEO title={minutes.name} description={getMinutesDescription(minutes)}/>
            <Container>
                <h2 className={styles.name}>{minutes.name}</h2>
                <h3 className={styles.number}>{formatDate(minutes.startDateTime)}</h3>
                <div className={styles.summary}>
                    <p>{minutes.summary}</p>
                    {minutes.topics != null &&
                    <Container>
                        {minutes.topics.map((topic) => {
                            return <p className={styles.topic}> {formatSentence(topic)} </p>
                        })}
                    </Container>}
                </div>

                <p className={styles.section}>公式リンク</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {minutes.urls.map((url) => {
                            return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                        })}
                    </FlexContainer>
                </div>

                <p className={styles.section}>所属委員会</p>
                <div className={styles.committee}>
                    <FlexContainer>
                        <CommitteeCard
                            title={minutes.belongedToCommittee.name}
                            to={buildPath(minutes.belongedToCommittee.id)}
                            left={true}
                        />
                    </FlexContainer>
                </div>

                {minutes.discussedBills.length > 0 &&
                <p className={styles.section}>関連議案</p>
                }
                <div className={styles.bills}>
                    <FlexContainer>
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
                    </FlexContainer>
                </div>

                {minutes.news.length > 0 &&
                <p className={styles.section}>関連ニュース</p>
                }
                <ul>
                    {minutes.news.map((news) => {
                        return <li><a className={styles.news} href={news.url}
                                      target="_blank" rel="noopener noreferrer">
                            {news.title}</a></li>
                    })}
                </ul>
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
                news {
                    title
                    url
                }
                startDateTime { year, month, day }
            }
        }
    }
`