export const QUERY_KEY = 'q'
export const PAGE_KEY = 'page'
export const CATEGORY_KEY = 'category'
export const STATUS_KEY = 'status'
export const DIET_KEY = 'diet'
export const SUBMITTED_DIET_KEY = 'sdiet'


export const categoryOptions = [
    {value: '0', label: '閣法'},
    {value: '1', label: '衆法'},
    {value: '2', label: '参法'},
];

export const statusOptions = [
    {value: '0', label: '提出'},
    {value: '1', label: '衆議院委員会可決'},
    {value: '2', label: '衆議院本会議可決'},
    {value: '3', label: '参議院委員会可決'},
    {value: '4', label: '参議院本会議可決'},
    {value: '5', label: '公布'},
]

export const dietOptions = [200, 201, 202, 203, 204].map(x => {
    return {value: x.toString(), label: `第${x}回国会`}
})

export const getInitialOptions = (urlStr, key, options) => {
    const initialOptions = []
    const values = new URL(urlStr).searchParams.getAll(key)
    for (const value of values) {
        for (const option of options) {
            if (option.value === value) {
                initialOptions.push(option)
            }
        }
    }
    return initialOptions;
}

export const getInitialCategories = (urlStr) => {
    return getInitialOptions(urlStr, CATEGORY_KEY, categoryOptions);
}

export const getInitialStatuses = (urlStr) => {
    return getInitialOptions(urlStr, STATUS_KEY, statusOptions);
}

export const getInitialDiets = (urlStr) => {
    return getInitialOptions(urlStr, DIET_KEY, dietOptions);
}

export const getInitialSubmittedDiets = (urlStr) => {
    return getInitialOptions(urlStr, SUBMITTED_DIET_KEY, dietOptions);
}

export const getInitialQuery = (urlStr) => {
    return new URL(urlStr).searchParams.get(QUERY_KEY) || "";
};

export const getInitialPage = (urlStr) => {
    return parseInt(new URL(urlStr).searchParams.get(PAGE_KEY) || '1');
}


export const buildUrlParamStr = (query, categories, statuses, diets, submittedDiets, page) => {
    const param = [];
    param.push(`${QUERY_KEY}=${encodeURI(query)}`)
    for (const category of categories) {
        param.push(`${CATEGORY_KEY}=${category.value}`)
    }
    for (const status of statuses) {
        param.push(`${STATUS_KEY}=${status.value}`)
    }
    for (const diet of diets) {
        param.push(`${DIET_KEY}=${diet.value}`)
    }
    for (const submittedDiet of submittedDiets) {
        param.push(`${SUBMITTED_DIET_KEY}=${submittedDiet.value}`)
    }
    param.push(`${PAGE_KEY}=${page}`)
    return param.join('&')
}
