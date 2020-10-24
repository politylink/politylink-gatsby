import React from "react"
import {graphql, navigate} from 'gatsby'
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getTimelinesTitle, getTimelinesDescription} from "../utils/seoutils";
import {Container} from "../components/container";
import {buildPath} from "../utils/urlutils";
import {formatDate} from "../utils/formatutils"
import Calendar from "react-calendar";
import "./calendar.css";


export const getDietDate = (Timeline) => {
    const dietDate = [];
    Timeline.map((timeline) => {
        if (timeline.totalMinutes > 0) {
            dietDate.push(formatDate(timeline.date));
        }
    });

    return dietDate;
}

export const formatCalendarDate = (date) => {
    return String(date.getFullYear()) + String(date.getMonth()+1).padStart(2, "0") + String(date.getDate()).padStart(2, "0")
}

export const setDietDate = ({date, view }, dietDate) => {
    const fDate = String(date.getFullYear()) + "/" + String(date.getMonth()+1).padStart(2, "0") + "/" + String(date.getDate()).padStart(2, "0")
    return (view === "month" && dietDate.includes(fDate)) ?  "react-calendar-diet-day": null;
}

export default class App extends React.Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    dietDate = getDietDate(this.props.data.politylink.Timeline);

    render() {
        return (
            <Layout>
                <SEO title={getTimelinesTitle()} description={getTimelinesDescription()}/>
                <div>
                    <p style={{textAlign: `center`, fontWeight: `bold`}}>タイムライン</p>
                    <div style={{textAlign: `right`}}>
                        <p style={{color: `#00bfff`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{fontSize: `0.8em`, paddingRight: `15px`, display: `inline`}}>国会開催日</p>
                    </div>
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