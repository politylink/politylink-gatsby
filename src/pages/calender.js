import React from "react"
import { graphql, Link } from 'gatsby'
import {buildPath} from "../utils/urlutils";
import SEO from "../components/seo"
import Layout from "../components/layout"
import {getCalenderTimelineTitle, getCalenderTimelineDescription} from "../utils/seoutils";
import {Container} from "../components/container";
import {CalenderTimeline} from "../components/calenderTimeline";
import {toJsDate} from "../utils/dateutils"
import {CALENDAR_TIMESTAMP_KEY} from "../utils/constants";
import ReactTooltip from 'react-tooltip';
import moment from "moment";

export const getLatestRound = (bills) => {
    const latestBillNumber = bills[bills.length - 1].billNumber;
    return latestBillNumber.match(/\d+/)[0];
}


export const getBillClassName = (billType) => {
    if (billType === "参法") {
        return "sanpou"
    } else if (billType === "衆法") {
        return "syuuhou"
    } else {
        return "kakuhou"
    }
}

export const getType = (bill) => {
    return bill.billNumber.match(/.法/)[0];
}

export const getGroups = (bills, round) => {
    return bills
        .filter((bill) => {
            return bill.billNumber.indexOf(round) > 0
        })
        .map((bill, index) => {
            const deliberationPeriod = bill.proclaimedDate.day ? (toJsDate(bill.proclaimedDate) - toJsDate(bill.submittedDate)) / 86400000 + "日" : "未公布"
            const startDate = bill.submittedDate.day ? toJsDate(bill.submittedDate) : null;
            return { id: index, title: bill.name, internalId: bill.id, tip: bill.billNumber, rightTitle: deliberationPeriod, startDate: startDate, endDate: toJsDate(bill.proclaimedDate), proclaimed: bill.proclaimedDate.day, billType: getType(bill) }
        });
}

export const getItems = (bills, round) => {
    const nested_items = bills
        .filter((bill) => {
            return bill.billNumber.indexOf(round) > 0
        })
        .map((bill, index) => {
            //const startRepresentativesDate = bill.passedRepresentativesCommitteeDate.day ? toJsDate(bill.passedRepresentativesCommitteeDate) : toJsDate(bill.passedRepresentativesDate);
            //const startCouncilorsDate = bill.passedCouncilorsCommitteeDate.day ? toJsDate(bill.passedCouncilorsCommitteeDate) : toJsDate(bill.passedCouncilorsDate);
            return [
                { id: null, group: index, title: "提出", start_time: toJsDate(bill.submittedDate), end_time: toJsDate(bill.submittedDate), color: 'rgb(158, 14, 206)', itemProps: { style: {background: '#93c47dff', border: 0, cursor: "none"}} },
                { id: null, group: index, title: "衆議院本会議", start_time: toJsDate(bill.passedRepresentativesDate), end_time: toJsDate(bill.passedRepresentativesDate), itemProps: { style: {background: '#6d9eebff', border: 0, cursor: "none"}} },
                { id: null, group: index, title: "参議院本会議", start_time: toJsDate(bill.passedCouncilorsDate), end_time: toJsDate(bill.passedCouncilorsDate), itemProps: { style: {background: '#8e7cc3ff', border: 0, cursor: "none"}}},
                { id: null, group: index, title: "公布", start_time: toJsDate(bill.proclaimedDate), end_time: toJsDate(bill.proclaimedDate), itemProps: { style: {background: '#c27ba0ff', border: 0, cursor: "none"}} }]
        });
    const flat_items = [].concat(...nested_items);
    return flat_items.map((bill, index) => {
        bill["id"] = index;
        return bill;
    })
}

export default class App extends React.Component {
    state = {
        date: (typeof window !== 'undefined' && sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY) != null)
            ? new Date(Number(sessionStorage.getItem(CALENDAR_TIMESTAMP_KEY))) : new Date(),
    }

    onChange = value => {
        sessionStorage.setItem(CALENDAR_TIMESTAMP_KEY, String(Number(value)));
        this.setState({date: value});
    }

    render() {
        const latestRound = 201; //getLatestRound(this.props.data.politylink.Bill);
        const groups = getGroups(this.props.data.politylink.Bill, latestRound);
        const items = getItems(this.props.data.politylink.Bill, latestRound);
        let groupRenderer = ({ group, isRightSidebar }) => {
            if (isRightSidebar) {
                return (
                    <div style={{"color": group.proclaimed ? "black" : "gray"}}>
                        {group.rightTitle}
                    </div>
                )
            } else {
                return (
                    <div className="rct-sidebar-row-item">
                        <span className={getBillClassName(group.billType)}>{group.billType}</span>
                        <Link data-tip={group.title + "<br />"+ group.tip} to={buildPath(group.internalId)}>
                            <span>{group.title}</span>
                        </Link>
                        <p>{group.tip}</p>
                        <ReactTooltip place="left" html={true}/>
                    </div>
                )
            }
          }
        const timeStart = moment().add(-12, "month");
        const timeEnd = moment();
        const visibleTimeStart = new Date(Math.min.apply(null, groups.map(bill => bill.startDate).filter(date => date)));
        let visibleTimeEnd = new Date(Math.max.apply(null, items.map(item => item.end_time).filter(date => date)));
        visibleTimeEnd.setDate(visibleTimeEnd.getDate() + 10);

        return (
            <Layout>
                <SEO title={getCalenderTimelineTitle()} description={getCalenderTimelineDescription()}/>
                <Container>
                <p style={{textAlign: `center`, fontWeight: `bold`}}>今国会提出の法律案カレンダー</p>
                    <div style={{ textAlign: `right`, margin: `10px 0` }}>
                            <p style={{ color: `#93c47dff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline` }}>■ </p>
                            <p style={{ fontSize: `0.8em`, display: `inline` }}>提出</p>
                            <p style={{color: `#6d9eebff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                            <p style={{ fontSize: `0.8em`, display: `inline` }}>衆議院</p>
                            <p style={{color: `#8e7cc3ff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                            <p style={{ fontSize: `0.8em`, display: `inline` }}>参議院</p>
                            <p style={{color: `#c27ba0ff`, paddingLeft: `15px`, fontSize: `0.8em`, display: `inline`}}>■ </p>
                            <p style={{ fontSize: `0.8em`, display: `inline` }}>公布</p>
                        </div>
                    <div style={{ textAlign: `right`, margin: `10px 0 10px`, padding: `0` }}>
                        <CalenderTimeline
                            onChange={this.onChange}
                            groups={groups}
                            items={items}
                            timeStart={timeStart}
                            timeEnd={timeEnd}
                            visibleTimeStart={visibleTimeStart}
                            visibleTimeEnd={visibleTimeEnd}
                            groupRenderer={groupRenderer}
                            round={latestRound}
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
            Bill (orderBy:[submittedDate_asc]) {
                id
                name
                billNumber
                submittedDate {year, month, day}
                passedRepresentativesCommitteeDate {year, month, day}
                passedRepresentativesDate {year, month, day}
                passedCouncilorsCommitteeDate {year, month, day}
                passedCouncilorsDate {year, month, day}
                proclaimedDate {year, month, day}
                isPassed
                totalNews
            }
        }
    }
`
