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
                        <a href="https://qiita.com/teo/items/4cf64f06fa105aa12d7e">
                            PolityLink を支える GraphQL テクノロジー
                        </a>
                        <span> (2021/01/14) </span>
                    </li>
                    <li>
                        <a href="https://kenya-sk.medium.com/politylink%E3%82%92%E6%B4%BB%E7%94%A8%E3%81%97%E3%81%9F%E5%88%86%E6%9E%90%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-51700d1e1d7f">
                            PolityLinkを活用した分析チュートリアル
                        </a>
                        <span> (2020/12/30) </span>
                    </li>
                    <li>

                        <a href="https://note.com/m2ku/n/na228266a9174">
                            政治のポータルサイトPolityLinkを作った話
                        </a>
                        <span> (2020/12/10) </span>
                    </li>
                    <li>

                        <Link to='/article/review_203_bills'>
                            法律案で振り返る第203回国会
                        </Link>
                        <span> (2020/12/09) </span>
                    </li>
                </ul>
            </Container>
        </Layout>
    );
}
