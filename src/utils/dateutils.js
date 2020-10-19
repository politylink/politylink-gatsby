export const toJsDate = (gqlDate) => {
    return new Date(gqlDate.year, gqlDate.month - 1, gqlDate.day)
}

export const offsetDate = (jsDate, offset) => {
    return new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate() + offset);
}

export const toTimelineId = (jsDate) => {
    return 'Timeline:'
        + String(jsDate.getFullYear()).padStart(4, '0')
        + String(jsDate.getMonth() + 1).padStart(2, '0')
        + String(jsDate.getDate()).padStart(2, '0')
}