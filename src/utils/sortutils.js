export const sortMinutesList = (minutesList) => {
    return sortDesc(minutesList, minutes => minutes.startDateTime.formatted + minutes.totalNews)
}

export const sortNewsList = (newsList) => {
    return sortDesc(newsList, news => news.publishedAt.formatted)
}

export const sortBillList = (billList) => {
    return sortDesc(billList, bill => bill.submittedDate.formatted)
}

export const sortActivityList = (activityList) => {
    return sortDesc(activityList, activity => activity.datetime.formatted)
}

const sortDesc = (list, mapFunc) => {
    return list.sort((a, b) => {
        return mapFunc(b).localeCompare(mapFunc(a))
    })
}