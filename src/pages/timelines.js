import React from "react"
import {graphql, Link} from 'gatsby'
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getTimelinesDescription} from "../utils/seoutils";
import {formatDateWithDay} from "../utils/format";
import {Container} from "../components/container";
import {buildPath} from "../utils/url";


export default class App extends React.Component {

    render() {
        return (
            <Layout>
                <SEO description={getTimelinesDescription()}/>
                <Container>
                    <ul>
                        {this.props.data.politylink.Timeline.map((timeline) => {
                            const text = `${formatDateWithDay(timeline.date)}
                            (議案: ${timeline.totalBills}, 会議: ${timeline.totalMinutes}, ニュース: ${timeline.totalNews}) `
                            return <li><Link to={buildPath(timeline.id)}>{text}</Link></li>;
                        })}
                    </ul>
                </Container>
            </Layout>
        )
    }
}

export const query = graphql`
    {
        politylink {
            Timeline (orderBy:id_desc) {
                id
                date { year, month, day }
                totalBills
                totalMinutes
                totalNews
            }
        }
    }
`
