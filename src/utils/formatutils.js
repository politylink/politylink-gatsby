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