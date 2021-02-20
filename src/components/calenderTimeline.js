import React from "react";
import Timeline, {
    TimelineMarkers,
    TodayMarker,
    DateHeader,
    SidebarHeader,
    TimelineHeaders
  } from "react-calendar-timeline";
import "./calenderTimeline.css"

export const CalenderTimeline = props => {
    return (
        <Timeline
            groups={props.groups}
            items={props.items}
            defaultTimeStart={props.defaultTimeStart.getTime()}
            defaultTimeEnd={props.defaultTimeEnd.getTime()}
            sidebarWidth={400}
            rightSidebarWidth={70}
            traditionalZoom={true}
            lineHeight={25}
            groupRenderer={props.groupRenderer}
            minZoom={24*60*60*1000}
        >
            <TimelineHeaders>
                <SidebarHeader>
                    {({ getRootProps }) => {
                        return <div {...getRootProps()} style={{ "margin": "auto", "text-align": "center", "width": "400px" }}><span>第{props.round}回国会審議法律案</span></div>
                    }}
                </SidebarHeader>
                <SidebarHeader variant="right">
                    {({ getRootProps }) => {
                        return <div {...getRootProps()} style={{ "margin": "auto", "text-align": "center", "width": "70px" }}>審議状況</div>
                    }}
                </SidebarHeader>
                <DateHeader unit="primaryHeader" />
                <DateHeader
                unit="month"
                labelFormat="M月"
                height={40}
                intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                    return <div {...getIntervalProps()} className="rct-dateHeader">
                    {intervalContext.intervalText}
                    </div>
                }}
                />
            </TimelineHeaders>
            <TimelineMarkers>
                <TodayMarker  />
            </TimelineMarkers>
        </Timeline>
    )
}