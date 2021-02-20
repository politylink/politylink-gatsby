import React from "react"
import { graphql, Link } from 'gatsby'
import {buildPath} from "../utils/urlutils";
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getCalenderTimelineTitle, getCalenderTimelineDescription} from "../utils/seoutils";
import {Container} from "../components/container";
import {CalenderTimeline} from "../components/calenderTimeline";
import {toJsDate} from "../utils/dateutils"
import {CALENDAR_PASSED_KEY, CALENDAR_TIMESTAMP_KEY} from "../utils/constants";
import {SearchFilter} from "../components/search"
import ReactTooltip from 'react-tooltip';

export const getType = (bill) => {
    return bill.billNumber.match(/.法/)[0];
}

export const appearAfterRoundStart = (bill, roundStartDate) => {
    const roundStart = roundStartDate.getTime();
    return toJsDate(bill.submittedDate).getTime() >= roundStart
        || toJsDate(bill.proclaimedDate).getTime() >= roundStart
        || toJsDate(bill.passedRepresentativesDate).getTime() >= roundStart
        || toJsDate(bill.passedCouncilorsDate).getTime() >= roundStart
}

export const getGroups = (bills) => {
    return bills
        .map((bill, index) => {
            const rightTitle = bill.isPassed ? "成立" :
                bill.passedRepresentativesDate ? "衆議院可決" :
                    bill.passedCouncilorsDate ? "参議院可決" : "提出";
            const rightColor = bill.isPassed ? "#c27ba0ff" :
            bill.passedRepresentativesDate ? "#6d9eebff" :
                bill.passedCouncilorsDate ? "#8e7cc3ff" : "grey";
            const startDate = toJsDate(bill.submittedDate);
            const endDate = toJsDate(bill.proclaimedDate);
            return { id: index, title: bill.name, internalId: bill.id, tip: bill.billNumber, rightTitle: rightTitle, startDate: startDate, endDate: endDate, proclaimed: bill.proclaimedDate, billType: getType(bill), category: bill.category, isPassed: bill.isPassed, rightColor: rightColor }
        });
}

export const getItems = (bills) => {
    const nested_items = bills
        .map((bill, index) => {
            return [
                { id: null, group: index, title: "", start_time: toJsDate(bill.submittedDate), end_time: toJsDate(bill.submittedDate), color: 'rgb(158, 14, 206)', itemProps: { style: {background: '#93c47dff', border: 0, cursor: "auto"}} },
                { id: null, group: index, title: "", start_time: toJsDate(bill.passedRepresentativesDate), end_time: toJsDate(bill.passedRepresentativesDate), itemProps: { style: {background: '#6d9eebff', border: 0, cursor: "auto"}} },
                { id: null, group: index, title: "", start_time: toJsDate(bill.passedCouncilorsDate), end_time: toJsDate(bill.passedCouncilorsDate), itemProps: { style: {background: '#8e7cc3ff', border: 0, cursor: "auto"}}},
                { id: null, group: index, title: "", start_time: toJsDate(bill.proclaimedDate), end_time: toJsDate(bill.proclaimedDate), itemProps: { style: {background: '#c27ba0ff', border: 0, cursor: "auto"}} }]
        });
    const flat_items = [].concat(...nested_items);
    return flat_items.map((item, index) => {
        item["id"] = index;
        return item;
    })
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: (typeof window !== 'undefined' && sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY) != null)
                ? new Date(Number(sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY))) : new Date(),
            filterPassed: (typeof window !== 'undefined' && localStorage.getItem(CALENDAR_PASSED_KEY) === 'true') || false,
        }
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }


    onChange = value => {
        sessionStorage.setItem(CALENDAR_TIMESTAMP_KEY, String(Number(value)));
        this.setState({date: value});
    }

    handleFilterClick(event) {
        const newVal = event.target.checked
        typeof window !== 'undefined' && localStorage.setItem(CALENDAR_PASSED_KEY, newVal.toString());
        this.setState({filterPassed: newVal})
    }

    render() {
        const diet = this.props.data.politylink.Diet[0];
        const timeStart = toJsDate(diet.startDate);
        const latestRound = diet.number;
        const bills = diet.bills.filter((bill) => {
            return appearAfterRoundStart(bill, timeStart) && (!this.state.filterPassed || bill.isPassed)
        });

        const groups = getGroups(bills);
        const items = getItems(bills);

        let groupRenderer = ({ group, isRightSidebar }) => {
            if (isRightSidebar) {
                return (
                    <div style={{"textAlign": "left"}}>
                        <span style={{ "color": group.rightColor, "fontWeight": "bold" }}>
                            {group.rightTitle}
                        </span>
                    </div>
                )
            } else {
                return (
                    <div className="rct-sidebar-row-item">
                        <span className={group.category.toLowerCase()}>{group.billType}</span>
                        <Link data-tip={group.title + "<br />"+ group.tip} to={buildPath(group.internalId)}>
                            <span>{group.title}</span>
                        </Link>
                        <p>{group.tip}</p>
                        <ReactTooltip place="left" html={true}/>
                    </div>
                )
            }
          }

        let timeEnd = new Date(Math.max.apply(null, items.map(item => item.end_time).filter(date => date)));
        timeEnd.setDate(timeEnd.getDate() + 10);

        return (
            <Layout>
                <SEO title={getCalenderTimelineTitle()} description={getCalenderTimelineDescription()}/>
                <div style={{maxWidth: `1080px`, margin:  `0 auto`}}>
                <div className="calendar-title">
                    <p style={{ textAlign: `center`, fontWeight: `bold` }}>法律案カレンダー</p>
                </div>
                <div className="calendar-title-filter">
                    <SearchFilter
                        handleChange={this.handleFilterClick}
                        checked={this.state.filterPassed}
                        label={'成立した法律案のみを表示'}
                    />
                </div>
                <div className="calendar-title-legend">
                    <div style={{ textAlign: `right`, margin: `10px 0` }}>
                        <p style={{ color: `#93c47dff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline` }}>■ </p>
                        <p style={{ fontSize: `0.8em`, display: `inline` }}>提出</p>
                        <p style={{ color: `#6d9eebff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{ fontSize: `0.8em`, display: `inline` }}>衆議院可決</p>
                        <p style={{ color: `#8e7cc3ff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{ fontSize: `0.8em`, display: `inline` }}>参議院可決</p>
                        <p style={{ color: `#c27ba0ff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                        <p style={{ fontSize: `0.8em`, display: `inline` }}>公布</p>
                    </div>
                </div>
                    <div style={{ textAlign: `right`, margin: `10px 0 10px`, padding: `0` }}>
                        <CalenderTimeline
                            onChange={this.onChange}
                            groups={groups}
                            items={items}
                            defaultTimeStart={timeStart}
                            defaultTimeEnd={timeEnd}
                            groupRenderer={groupRenderer}
                            round={latestRound}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export const query = graphql`
    {
        politylink {
            Diet (orderBy:[startDate_desc], first:1) {
                name
                number
                startDate {year, month, day}
                bills (orderBy:[submittedDate_asc]) {
                    id
                    name
                    category
                    billNumber
                    submittedDate {year, month, day}
                    passedRepresentativesCommitteeDate {year, month, day}
                    passedRepresentativesDate {year, month, day}
                    passedCouncilorsCommitteeDate {year, month, day}
                    passedCouncilorsDate {year, month, day}
                    proclaimedDate {year, month, day}
                    isPassed
                }
            }
        }
    }
`
