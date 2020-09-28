// descending order of startDateTime
export const sortMinutesList = (minutesList) => {
    return minutesList.sort((a, b) => {
        return b.startDateTime.formatted.localeCompare(a.startDateTime.formatted)
    });
}

// descending order of publishedAt
export const sortNewsList = (newsList) => {
    return newsList.sort((a, b) => {
        return b.publishedAt.formatted.localeCompare(a.publishedAt.formatted)
    });
}
