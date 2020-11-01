import {toDayOfWeek, toJsDate} from "./dateutils";

export const formatTopicSentence = (sentence) => {
    return "- " + sentence
}

export const formatLongSentence = (sentence, limit) => {
    if (sentence.length < limit) {
        return sentence;
    } else {
        return sentence.substr(0, limit) + "..."
    }
}

export const formatDate = (gqlDate, separator = "/") => {
    return formatJsDate(toJsDate(gqlDate), separator)
}

export const formatJsDate = (jsDate, separator = "/") => {
    return [
        String(jsDate.getFullYear()),
        String(jsDate.getMonth() + 1).padStart(2, "0"),
        String(jsDate.getDate()).padStart(2, "0")
    ].join(separator)
}

export const formatDateWithDay = (gqlDate) => {
    const jsDate = toJsDate(gqlDate)
    return `${formatJsDate(jsDate)}(${toDayOfWeek(jsDate)})`
}

export const joinNullableStringList = (maybeList) => {
    return maybeList == null ? '' : maybeList.join('')
}
