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

export const trimTopics = (topics, length) => {
    if (topics.length <= length) {
        return topics
    } else {
        return topics.slice(0, length).concat(['...'])
    }
}

export const joinNullableStringList = (maybeList) => {
    return maybeList == null ? '' : maybeList.join('')
}

export const formatDomain = (url) => {
    return new URL(url).hostname.replace('www.', '')
}

export const getTwitterScreenName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

export const translateBillActionType = (type) => {
    switch (type) {
        case 'BILL_EXPLANATION':
            return '趣旨説明';
        case 'AMENDMENT_EXPLANATION':
            return '修正案趣旨説明';
        case 'SUPPLEMENTARY_EXPLANATION':
            return '附帯決議趣旨説明';
        case 'QUESTION':
            return '質疑';
        case 'DEBATE':
            return '討論';
        case 'VOTE':
            return '採決';
        case 'REPORT':
            return '委員長報告';
        default:
            return null;
    }
}

export const formatMemberName = (name, nameHira, isDesktop) => {
    if (isDesktop) {
        return `${name}（${nameHira}）`
    } else {
        return name
    }
}