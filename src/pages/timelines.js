import React from "react"
import {graphql, navigate} from 'gatsby'
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getTimelinesTitle, getTimelinesDescription} from "../utils/seoutils";
import {Container} from "../components/container";
import {buildPath} from "../utils/urlutils";
import {formatDate, formatJSDate} from "../utils/formatutils"
import Calendar from "react-calendar";
import "./calendar.css";


export const getDietDates = (timelines) => {
    const dietDate = [];
    timelines.map((timeline) => {
        if (timeline.totalMinutes > 0) {
            dietDate.push(formatDate(timeline.date));
        }
    });

    return dietDate;
}

export const setDietDate = ({date, view }, dietDate) => {
    const fDate = formatJSDate(date, "/")
    return (view === "month" && dietDate.includes(fDate)) ?  "react-calendar-diet-day": null;
}

export default class App extends React.Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    dietDate = getDietDates(this.props.data.politylink.Timeline);

    render() {
        return (
            <Layout>
                <SEO title={getTimelinesTitle()} description={getTimelinesDescription()}/>
                <Container>
                    <p style={{textAlign: `center`, fontWeight: `bold`}}>タイムライン</p>
                    <Container style={{textAlign: `right`}}>
                        <p style={{color: `#00bfff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{fontSize: `0.8em`, display: `inline`}}>国会開催日</p>
                    </Container>
                    <Container>
                        <Calendar
                            locale={"ja-JP"}
                            calendarType={"US"}
                            onChange={this.onChange}
                            value={this.state.date}
                            view={"month"}
                            minDate={new Date(2019, 12, 1)}
                            maxDate={new Date()}
                            tileClassName={({date, view }) => setDietDate({date, view}, this.dietDate)}
                            onClickDay={(value) => navigate(buildPath(`Timeline:${formatJSDate(value, "")}`))}
                        />
                    </Container>
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
