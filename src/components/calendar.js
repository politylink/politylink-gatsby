import {navigate} from "gatsby";
import {buildPath} from "../utils/urlutils";
import {formatJsDate} from "../utils/formatutils";
import React from "react";
import Calendar from "react-calendar";
import "./calendar.css";

export const setDietDate = ({date, view}, dietDates) => {
    const fDate = formatJsDate(date, "/")
    return (view === "month" && dietDates.includes(fDate)) ? "react-calendar-diet-day"
        : (date.toDateString() === new Date().toDateString()) ? "react-calendar-today"
        : null;
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