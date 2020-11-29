import {navigate} from "gatsby";
import {buildPath} from "../utils/urlutils";
import {formatJsDate} from "../utils/dateutils";
import React from "react";
import classNames from 'classnames';
import Calendar from "react-calendar";
import "./calendar.css";

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
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
            tileClassName={({date, view}) => setDietDate({date, view}, props.dietDates)}
            onClickDay={(value) => navigate(buildPath(`Timeline:${formatJsDate(value, "")}`))}
        />
    )
}