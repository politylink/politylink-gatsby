import {formatDate, formatDateWithDay} from "./format";

export const getBillsDescription = () => {
    return "国会に提出された法律案（議案）を検索できます。"
}

export const getCommitteesDescription = () => {
    return "衆議院・参議院の委員会・調査会を検索できます。"
}

export const getTimelinesDescription = () => {
    return "国会に関するニュースを日毎に確認できます。"
}

export const getBillDescription = (bill) => {
    return `${bill.name}（${bill.billNumber}）に関する情報（本文、概要、審議状況、会議録など）をまとめています。`
}

export const getCommitteeDescription = (committee) => {
    return `${committee.name}に関する情報（所管事項、設置理由、会議録など）をまとめています。`
}

export const getMinutesDescription = (minutes) => {
    return `${formatDate(minutes.startDateTime)}開催の${minutes.name}に関する情報（議題、審議された議案など）をまとめています。`
}

export const getTimelineTitle = (timeline) => {
    return `${formatDate(timeline.date)}の出来事`
}

export const getTimelineDescription = (timeline) => {
    return `${formatDateWithDay(timeline.date)}付けの国会に関する情報（会議録、成立した議案、ニュース記事など）をまとめています。`
}
