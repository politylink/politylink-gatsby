import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout";
import {Container} from "../components/container";
import styles from "./markdown.module.css"

export default function Template({data}) {
    const {markdownRemark} = data
    const {html} = markdownRemark
    return (
        <Layout>
            <Container>
                <div className={styles.div}
                     dangerouslySetInnerHTML={{__html: html}}
                />
            </Container>
        </Layout>
    )
}
export const query = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                slug
            }
        }
    }
`