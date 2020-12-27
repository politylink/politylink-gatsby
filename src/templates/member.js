import React from "react"
import {graphql} from "gatsby"
import styles from "./member.module.css"
import {Container, FlexContainer} from "../components/container"
import Layout from "../components/layout";
import SEO from "../components/seo";
import {getMemberDescription} from "../utils/seoutils";
import LinkCard from "../components/linkCard";


export default function Member({data}) {
    const member = data.politylink.Member[0]
    const house = member.house === 'REPRESENTATIVES' ? '衆' : '参'
    const tags = [house].concat(member.tags)

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
            }
        }
    }
`