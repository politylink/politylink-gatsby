import React from "react"
import {graphql} from "gatsby"
import styles from "./member.module.css"
import {
    Container,
    ExpandableContainer,
    FlexContainer,
    SinglePaneContainer,
    TwoPaneContainer
} from "../components/layouts/container"
import Layout from "../components/layouts/layout";
import SEO from "../components/seo";
import {getMemberDescription} from "../utils/seoUtils";
import LinkCard from "../components/cards/linkCard";
import {sortActivityList, sortActivityUrlList, sortMemberUrlList} from "../utils/sortUtils";
import {EXPAND_ACTIVITY_KEY} from "../utils/constants";
import Share from "../components/share";
import {BillActivityCard, MinutesActivityCard} from "../components/cards/activityCard";
import {buildImagePath, buildPath} from "../utils/urlUtils";
import SocialLinks from "../components/socialLinks";
import {formatDomain, getTwitterScreenName} from "../utils/formatUtils";
import ParentPath from "../components/navigations/parentPath";
import {Timeline} from 'react-twitter-widgets'


export default function Member({data}) {
    const member = data.politylink.Member[0]
    const house = member.house === 'REPRESENTATIVES' ? '衆' : '参'
    const tags = [house].concat(member.tags)
    const activityList = sortActivityList(member.activities)
    const urlList = sortMemberUrlList(member.urls)
    const imagePath = buildImagePath(member.id, 'jpg')

    return (
        <Layout>
            <SEO title={member.name} description={getMemberDescription(member)} image={imagePath}/>
            <SinglePaneContainer>
                <ParentPath to={'/members'} text={'議員一覧'}/>
            </SinglePaneContainer>
            <TwoPaneContainer>
                <Container>
                    <div className={styles.section}>
                        <Container>
                            <div className={styles.imageDiv}>
                                <img className={styles.image} src={imagePath} alt={'顔写真'}/>
                            </div>
                            <FlexContainer>
                                <h2 className={styles.name}>{member.name}</h2>
                                <p className={styles.tags}>{tags.join('・')}</p>
                                <SocialLinks member={member}/>
                            </FlexContainer>
                            <div className={styles.description}>
                                <p>{member.description}</p>
                            </div>
                        </Container>
                    </div>

                    <div className={styles.section}>
                        <FlexContainer
                            title={"リンク"}
                        >
                            {member.website &&
                            <LinkCard href={member.website} title={'公式サイト'} domain={formatDomain(member.website)}/>
                            }
                            {urlList.map((url) => {
                                return <LinkCard href={url.url} title={url.title} domain={url.domain}/>
                            })}
                        </FlexContainer>
                    </div>
                </Container>

                {(activityList.length > 0 || member.twitter) &&
                <Container>
                    {activityList.length > 0 &&
                    <div className={styles.section}>
                        <ExpandableContainer
                            title={"国会での活動"}
                            localStorageKey={EXPAND_ACTIVITY_KEY}
                            sizeLimit={3}
                        >
                            {activityList.map((activity) => {
                                const urlList = sortActivityUrlList(activity.urls)
                                if (activity.minutes != null) {
                                    return <MinutesActivityCard
                                        datetime={activity.datetime}
                                        minutes={activity.minutes}
                                        urls={urlList}
                                        keyphrases={activity.keyphrases}
                                    />
                                } else if (activity.bill != null) {
                                    return <BillActivityCard
                                        datetime={activity.datetime}
                                        bill={activity.bill}
                                        urls={urlList}
                                    />
                                } else {
                                    return null;
                                }
                            })}
                        </ExpandableContainer>
                    </div>}

                    {member.twitter &&
                    <div className={styles.section}>
                        <Container>
                            <Timeline
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: getTwitterScreenName(member.twitter)
                                }}
                                options={{
                                    height: '800',
                                    lang: 'ja'
                                }}
                            />
                        </Container>
                    </div>}
                </Container>}
            </TwoPaneContainer>
            <SinglePaneContainer><Share title={member.name} postPath={buildPath(member.id)}/></SinglePaneContainer>
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
                website
                twitter
                facebook
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
                    keyphrases
                }
            }
        }
    }
`