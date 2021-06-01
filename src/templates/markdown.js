import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layouts/layout";
import styles from "./markdown.module.css"
import SEO from "../components/seo";

export default function Template({data}) {
    const {markdownRemark} = data
    const {frontmatter, html} = markdownRemark
    return (
        <Layout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description}
                image={frontmatter.image || undefined}
                twitterType={frontmatter.twitterType || undefined}
            />
            <div className={styles.container}>
                <div className={styles.div}
                     dangerouslySetInnerHTML={{__html: html}}
                />
            </div>
        </Layout>
    )
}
export const query = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                slug
                title
                description
                image
                twitterType
            }
        }
    }
`