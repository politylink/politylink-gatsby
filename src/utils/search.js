export const isMatch = (query, text) => {
    const queryList = query.split(/\s+/)
    for (let i = 0; i < queryList.length; i++) {
        if (text.indexOf(queryList[i]) === -1) {
            return false;
        }
    }
    return true;
}