import {navigate} from "gatsby";
import {buildPath} from "../utils/urlUtils";
import {formatJsDate, toJsDate} from "../utils/dateUtils";
import React from "react";
import classNames from 'classnames';
import Calendar from "react-calendar";
import "./timelineCalendar.css";

export const setDietDate = ({date, view}, dietDates) => {
    const fDate = formatJsDate(date, "/")
    let tileClassName = "";
    if (view === "month" && dietDates.includes(fDate)) {tileClassName = classNames(tileClassName, "react-calendar-diet-day")}
    if (date.toDateString() === new Date().toDateString()) {tileClassName = classNames(tileClassName,"react-calendar-today")}
    return (tileClassName !== "") ? tileClassName : null;
}

export const TimelineCalendar = props => {
    return (
        <Calendar
            locale={"ja-JP"}
            calendarType={"US"}
            onChange={props.onChange}
            value={props.date}
            view={"month"}
            minDate={toJsDate(props.minDate)}
            maxDate={toJsDate(props.maxDate)}
            tileClassName={({date, view}) => setDietDate({date, view}, props.dietDates)}
            onClickDay={(value) => navigate(buildPath(`Timeline:${formatJsDate(value, "")}`))}
        />
    )
}