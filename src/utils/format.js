export const formatSentence = (sentence) => {
    return "- " + sentence
}

export const formatDate = (date) => {
    return String(date.year) + "/" + String(date.month).padStart(2, '0') + "/" + String(date.day).padStart(2, '0')
}

export const joinNullableStringList = (maybeList) => {
    return maybeList == null ? '' : maybeList.join('')
}
