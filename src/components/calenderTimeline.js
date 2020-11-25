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
            visibleTimeStart={props.visibleTimeStart}
            visibleTimeEnd={props.visibleTimeEnd}
            sidebarWidth={200}
            rightSidebarWidth={70}
            traditionalZoom={true}
            lineHeight={25}
            groupRenderer={props.groupRenderer}
            minZoom={24*60*60*1000}
        >
            <TimelineHeaders>
                <SidebarHeader>
                    {({ getRootProps }) => {
                        return <div {...getRootProps()} style={{ "color": "white", "margin": "auto" }}>第{props.round}回国会提出議案</div>
                    }}
                </SidebarHeader>
                <SidebarHeader variant="right">
                    {({ getRootProps }) => {
                        return <div {...getRootProps()} style={{ "color": "white", "margin": "auto" }}>期間</div>
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