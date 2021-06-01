export const categoryOptions = [
    {value: 'KAKUHOU', label: '閣法'},
    {value: 'SHUHOU', label: '衆法'},
    {value: 'SANHOU', label: '参法'},
];


export const getInitialQuery = () => {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location);
        return url.searchParams.get("q") || "";
    }
    return "";
};

export const getInitialCategories = () => {
    const categories = []
    if (typeof window !== 'undefined') {
        const categoryValues = new URL(window.location).searchParams.getAll("category")
        for (const categoryValue of categoryValues) {
            for (const category of categoryOptions) {
                if (category.value === categoryValue) {
                    categories.push(category)
                }
            }
        }
    }
    return categories;
}

export const getInitialPage = () => {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location);
        return parseInt(url.searchParams.get("page") || '1');
    }
    return 1;
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
