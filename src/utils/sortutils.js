export const sortMinutesList = (minutesList) => {
    return sortStrDesc(minutesList, minutes => minutes.startDateTime.formatted + minutes.totalNews)
}

export const sortNewsList = (newsList) => {
    return sortStrDesc(newsList, news => news.publishedAt.formatted)
}

export const sortBillList = (billList) => {
    return sortStrDesc(billList, bill => bill.submittedDate.formatted)
}

export const sortActivityList = (activityList) => {
    return sortStrDesc(activityList, activity => activity.datetime.formatted)
}

export const sortBillUrlList = (urlList) => {
    const titleOrder = ["本文", "議案情報", "経過", "概要", "概要PDF", "新旧対照表PDF"]
    return sortUrlList(urlList, titleOrder)
}

export const sortMinutesUrlList = (urlList) => {
    const titleOrder = ["本文", "審議中継", "国会審議映像検索システム", "概要PDF", "質疑項目", "委員会経過", "自動文字起こし"]
    return sortUrlList(urlList, titleOrder)
}

export const sortMemberUrlList = (urlList) => {
    const titleOrder = ["議員情報", "国会審議映像検索システム"]
    return sortUrlList(urlList, titleOrder)
}

export const sortActivityUrlList = (urlList) => {
    const titleOrder = ["本文", "審議中継"]
    return sortUrlList(urlList, titleOrder)
}

const sortUrlList = (urlList, titleOrder) => {
    const weightMap = new Map(titleOrder.map((x, i) => [x, i + 1]))
    const mapFunc = url => weightMap.get(url.title) || Number.MAX_SAFE_INTEGER
    return sortIntAsc(urlList, mapFunc)
}

const sortStrDesc = (list, mapFunc) => {
    return list.sort((a, b) => {
        return mapFunc(b).localeCompare(mapFunc(a))
    })
}

const sortIntAsc = (list, mapFunc) => {
    return list.sort((a, b) => {
        return mapFunc(a) - mapFunc(b);
    })
}
