import React from "react"
import {graphql, navigate, Link} from 'gatsby'
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getTimelinesTitle, getTimelinesDescription} from "../utils/seoutils";
import {Container} from "../components/container";
import {buildPath} from "../utils/urlutils";
import Calendar from 'react-calendar';
import './calendar.css';


export const formatCalendarDate = (date) => {
    return String(date.getFullYear()) + String(date.getMonth()+1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
}


export default class App extends React.Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <Layout>
                <SEO title={getTimelinesTitle()} description={getTimelinesDescription()}/>
                <div>
                    <p style={{textAlign: `center`}}>タイムライン</p>
                    <Container>
                        <Calendar
                            locale="ja-JP"
                            onChange={this.onChange}
                            value={this.state.date}
                            minDate={new Date(2019, 12, 1)}
                            maxDate={new Date()}
                            onClickDay={(value) => navigate(buildPath(`Timeline:${formatCalendarDate(value)}`))}
                        />
                    </Container>
                </div>
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

// totalMinutes != 0