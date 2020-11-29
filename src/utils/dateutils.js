const toJsDate = (gqlDate) => {
    return new Date(gqlDate.year, gqlDate.month - 1, gqlDate.day)
}

const offsetDate = (jsDate, offset) => {
    return new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate() + offset);
}

const toDayOfWeek = (jsDate) => {
    return ["日", "月", "火", "水", "木", "金", "土"][jsDate.getDay()]
}

const toTimelineId = (jsDate) => {
    return 'Timeline:' + formatJsDate(jsDate, "")
}

const formatDate = (gqlDate, separator = "/") => {
    return formatJsDate(toJsDate(gqlDate), separator)
}

const formatJsDate = (jsDate, separator = "/") => {
    return [
        String(jsDate.getFullYear()).padStart(4, '0'),
        String(jsDate.getMonth() + 1).padStart(2, "0"),
        String(jsDate.getDate()).padStart(2, "0")
    ].join(separator)
}

const formatDateWithDay = (gqlDate) => {
    const jsDate = toJsDate(gqlDate)
    return `${formatJsDate(jsDate)}(${toDayOfWeek(jsDate)})`
}


module.exports.toJsDate = toJsDate
module.exports.offsetDate = offsetDate
module.exports.toDayOfWeek = toDayOfWeek
module.exports.toTimelineId = toTimelineId
module.exports.formatDate = formatDate
module.exports.formatJsDate = formatJsDate
module.exports.formatDateWithDay = formatDateWithDay