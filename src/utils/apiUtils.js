export const categoryOptions = [
    {value: 'KAKUHOU', label: '閣法'},
    {value: 'SHUHOU', label: '衆法'},
    {value: 'SANHOU', label: '参法'},
];

export const getInitialCategories = (urlStr) => {
    const categories = []
    const categoryValues = new URL(urlStr).searchParams.getAll("category")
    for (const categoryValue of categoryValues) {
        for (const category of categoryOptions) {
            if (category.value === categoryValue) {
                categories.push(category)
            }
        }
    }
    return categories;
}


export const getInitialQuery = (urlStr) => {
    return new URL(urlStr).searchParams.get("q") || "";
};

export const getInitialPage = (urlStr) => {
    return parseInt(new URL(urlStr).searchParams.get("page") || '1');
}


export const buildUrlParamStr = (query, categories, page) => {
    const param = [];
    param.push(`q=${encodeURI(query)}`)
    for (const category of categories) {
        param.push(`category=${encodeURI(category.value)}`)
    }
    param.push(`page=${page}`)
    return param.join('&')
}
