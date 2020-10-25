import {toDayOfWeek, toJsDate} from "./dateutils";

export const formatSentence = (sentence) => {
    return "- " + sentence
}

export const formatDate = (gqlDate) => {
    return String(gqlDate.year) + "/" + String(gqlDate.month).padStart(2, '0') + "/" + String(gqlDate.day).padStart(2, '0')
}

export const formatDateWithDay = (gqlDate) => {
    return `${formatDate(gqlDate)}(${toDayOfWeek(toJsDate(gqlDate))})`
}

export const joinNullableStringList = (maybeList) => {
    return maybeList == null ? '' : maybeList.join('')
}

export const formatJSDate = (date, separator) => {
    return String(date.getFullYear()) + String(separator)+ String(date.getMonth()+1).padStart(2, "0") + String(separator) + String(date.getDate()).padStart(2, "0")
}
