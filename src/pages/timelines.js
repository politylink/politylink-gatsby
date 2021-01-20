import React from "react"
import {graphql} from 'gatsby'
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getTimelinesDescription, getTimelinesTitle} from "../utils/seoutils";
import {Container} from "../components/container";
import {TimelineCalendar} from "../components/calendar";
import {formatDate} from "../utils/dateutils"
import {CALENDAR_TIMESTAMP_KEY} from "../utils/constants";


export const getDietDates = (timelines) => {
    return timelines
        .filter((timeline) => {
            return timeline.totalMinutes > 0
        })
        .map((timeline) => {
            return formatDate(timeline.date, "/")
        });
}


export default class App extends React.Component {
    state = {
        date: (typeof window !== 'undefined' &&　sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY) != null)
            ? new Date(Number(sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY))) : new Date(),
    }

    onChange = value => {
        sessionStorage.setItem(CALENDAR_TIMESTAMP_KEY, String(Number(value)));
        this.setState({date: value});
    }

    dietDates = getDietDates(this.props.data.politylink.Timeline);

    render() {
        return (
            <Layout>
                <SEO title={getTimelinesTitle()} description={getTimelinesDescription()}/>
                <Container>
                    <p style={{textAlign: `center`, fontWeight: `bold`}}>国会タイムライン</p>
                    <div style={{textAlign: `right`, margin: `10px`}}>
                        <p style={{color: `#006edc`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{fontSize: `0.8em`, display: `inline`}}>国会開催日</p>
                        <TimelineCalendar
                            onChange={this.onChange}
                            date={this.state.date}
                            dietDates={this.dietDates}
                            minDate={this.props.data.politylink.Timeline[0].date}
                            maxDate={this.props.data.politylink.Timeline[this.props.data.politylink.Timeline.length - 1].date}
                        />
                    </div>
                </Container>
            </Layout>
        )
    }
}

export const query = graphql`
    {
        politylink {
            Timeline (orderBy:date_asc) {
                id
                date { year, month, day }
                totalBills
                totalMinutes
                totalNews
            }
        }
    }
`
