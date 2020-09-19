import React from "react"
import {graphql} from 'gatsby'
import styles from "./bill.module.css"
import ProgressBadge from "../components/progress"
import {Container, FlexContainer} from "../components/container"
import LinkCard from "../components/linkCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MinutesCard from "../components/minutesCard"
import {formatDate} from "../utils/format"
import {SortByStartDateTime} from "../utils/sort"

export const formatArrowDate = (date) => {
    if (date == null || date.year == null || date.month == null || date.day == null) {
        return '-'
    }
    return String(date.year) + "\n" + String(date.month).padStart(2, '0') + "/" + String(date.day).padStart(2, '0')
}

export default function Bill({data}) {
    const bill = data.politylink.Bill[0]
    let arrows
    if (bill.firstHouse === "REPRESENTATIVES") {
        arrows = [
            {"title": "提出", "value": formatArrowDate(bill.submittedDate), "color": 0},
            {"title": '衆議院\n委員会', "value": formatArrowDate(bill.passedRepresentativesCommitteeDate), "color": 1},
            {"title": "衆議院\n本会議", "value": formatArrowDate(bill.passedRepresentativesDate), "color": 2},
            {"title": "参議院\n委員会", "value": formatArrowDate(bill.passedCouncilorsCommitteeDate), "color": 3},
            {"title": "参議院\n本会議", "value": formatArrowDate(bill.passedCouncilorsDate), "color": 4},
            {"title": "公布", "value": formatArrowDate(bill.proclaimedDate), "color": 5},
        ]
    } else {
        arrows = [
            {"title": "提出", "value": formatArrowDate(bill.submittedDate), "color": 0},
            {"title": "参議院\n委員会", "value": formatArrowDate(bill.passedCouncilorsCommitteeDate), "color": 1},
            {"title": "参議院\n本会議", "value": formatArrowDate(bill.passedCouncilorsDate), "color": 2},
            {"title": '衆議院\n委員会', "value": formatArrowDate(bill.passedRepresentativesCommitteeDate), "color": 3},
            {"title": "衆議院\n本会議", "value": formatArrowDate(bill.passedRepresentativesDate), "color": 4},
            {"title": "公布", "value": formatArrowDate(bill.proclaimedDate), "color": 5},
        ]
    }

    const description = bill.name + "（" + bill.billNumber + "）に関する公式情報（議案本文、理由、概要、審議状況、国会会議録など）をまとめています。"
    const minutes = SortByStartDateTime(bill.beDiscussedByMinutes, true)

    return (
        <Layout>
            <SEO title={bill.name} description={description}/>
            <Container>
                <h2 className={styles.name}>{bill.name}</h2>
                <h3 className={styles.number}>{bill.billNumber}</h3>
                <p className={styles.reason}>{bill.reason}</p>
                <ProgressBadge arrows={arrows}/>
                <p className={styles.section}>公式リンク</p>
                <div className={styles.links}>
                    <FlexContainer>
                        {bill.urls.map((url) => {
                            return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                        })}
                    </FlexContainer>
                </div>
                <p className={styles.section}>会議録</p>
                <div className={styles.minutes}>
                    <FlexContainer>
                        {minutes.map((minutes) => {
                            return <MinutesCard
                                to={"/minutes/" + minutes.id.split(':').pop()}
                                name={minutes.name}
                                topics={minutes.topics}
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
    query($billId: ID!){
        politylink {
            Bill(filter:{id:$billId}){
                name
                billNumber
                reason
                firstHouse
                urls {
                    url
                    title
                    domain
                }
                beDiscussedByMinutes{
                    id
                    name
                    url
                    topics
                    startDateTime { year, month, day }
                }
                submittedDate { year, month, day }
                passedRepresentativesCommitteeDate { year, month, day }
                passedRepresentativesDate { year, month, day }
                passedCouncilorsCommitteeDate { year, month, day }
                passedCouncilorsDate { year, month, day }
                proclaimedDate { year, month, day }
            }
        }
    }
`