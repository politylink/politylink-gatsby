import React from "react"
import Layout from "../components/layout"
import {Link} from "gatsby";
import {Container} from "../components/container";
import SEO from "../components/seo";
import {getArticlesDescription, getArticlesTitle} from "../utils/seoutils";

export default function Members() {
    return (
        <Layout>
            <SEO title={getArticlesTitle()} description={getArticlesDescription()}/>
            <Container>
                <p> PolityLink開発者が実際にPolityLinkを使ってみて分かったことなどを不定期で記事にしています。</p>
                <ul>
                    <li>
                        <Link to='/article/review_203_bills'>
                            <p>法律案で振り返る第203回国会</p>
                        </Link>
                    </li>
                </ul>
            </Container>
        </Layout>
    );
}