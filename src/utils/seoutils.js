import {formatDate, formatDateWithDay} from "./formatutils";

export const getBillsDescription = () => {
    return "国会に提出された法律案を検索し、法律案の内容や審議状況を確認できます。"
}

export const getCommitteesDescription = () => {
    return "衆議院・参議院の委員会・調査会を検索し、開催された会議の要約や議論された法律案を確認できます。"
}

export const getTimelinesTitle = () => {
    return "国会タイムライン"
}

export const getTimelinesDescription = () => {
    return "今日はどんな会議が開催されたか？成立した法律案はあるか？国会に関する最新情報をその日のニュース記事と一緒にチェックできます。"
}

export const getBillDescription = (bill) => {
    return `${bill.name}（${bill.billNumber}）に関する情報（本文、概要、審議状況、会議録など）をまとめています。`
}

export const getCommitteeDescription = (committee) => {
    return `${committee.name}に関する情報（所管事項、設置理由、会議録など）をまとめています。`
}

export const getMinutesDescription = (minutes) => {
    return `${formatDate(minutes.startDateTime)}開催の${minutes.name}に関する情報（議題、審議された法律案など）をまとめています。`
}

export const getTimelineTitle = (timeline) => {
    return `国会タイムライン@${formatDateWithDay(timeline.date)}`
}

export const getTimelineDescription = (timeline) => {
    return `${formatDate(timeline.date)}付けの国会に関する最新情報（会議録、成立した法律案、ニュース記事など）をまとめています。`
}

export const getCalenderTimelineTitle = () => {
    return `法律案カレンダー`
}

export const getCalenderTimelineDescription = () => {
    return `直近の国会で審議された議案の進捗状況を、一覧形式で比較することができます。`
}