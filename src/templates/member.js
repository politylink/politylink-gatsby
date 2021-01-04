import React from "react"
import {graphql} from "gatsby"
import styles from "./member.module.css"
import {Container, ExpandableContainer, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import {getMemberDescription} from "../utils/seoutils";
import LinkCard from "../components/linkCard";
import {sortActivityList} from "../utils/sortutils";
import {EXPAND_ACTIVITY_KEY} from "../utils/constants";
import Share from "../components/share";
import {BillActivityCard, MinutesActivityCard} from "../components/activityCard";
import {buildImagePath, buildPath} from "../utils/urlutils";


export default function Member({data}) {
    const member = data.politylink.Member[0]
    const house = member.house === 'REPRESENTATIVES' ? '衆' : '参'
    const tags = [house].concat(member.tags)
    const activityList = sortActivityList(member.activities)

    return (
        <Layout>
            <SEO title={member.name} description={getMemberDescription(member)} image={buildImagePath(member.id)}/>
            <div className={styles.section}>
                <Container>
                    <div className={styles.imageDiv}>
                        <img className={styles.image} src={buildImagePath(member.id)} alt={'顔写真'}/>
                    </div>
                    <FlexContainer>
                        <h2 className={styles.name}>{member.name}</h2>
                        <p className={styles.tags}>{tags.join('・')}</p>
                    </FlexContainer>
                    <Share title={member.name} postPath={buildPath(member.id)}/>
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

            {activityList.length > 0 &&
            <div className={styles.section}>
                <ExpandableContainer
                    title={"国会での活動"}
                    localStorageKey={EXPAND_ACTIVITY_KEY}
                    sizeLimit={5}
                >
                    {activityList.map((activity) => {
                        if (activity.minutes != null) {
                            return <MinutesActivityCard
                                datetime={activity.datetime}
                                minutes={activity.minutes}
                                urls={activity.urls}
                            />
                        } else if (activity.bill != null) {
                            return <BillActivityCard
                                datetime={activity.datetime}
                                bill={activity.bill}
                                urls={activity.urls}
                            />
                        }
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
                activities {
                    datetime {year, month, day, formatted }
                    minutes {
                        id
                        name
                    }
                    bill {
                        id
                        name
                        billNumber
                    }
                    urls {
                        url
                        title
                    }
                }
            }
        }
    }
`