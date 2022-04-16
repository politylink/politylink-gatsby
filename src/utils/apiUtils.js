export const QUERY_KEY = 'q'
export const PAGE_KEY = 'page'
export const CATEGORY_KEY = 'category'
export const STATUS_KEY = 'status'
export const DIET_KEY = 'diet'
export const SUBMITTED_DIET_KEY = 'sdiet'
export const GROUP_KEY = 'group'
export const SUBMITTED_GROUP_KEY = 'sbgroup'
export const SUPPORTED_GROUP_KEY = 'spgroup'
export const OPPOSED_GROUP_KEY = 'opgroup'
export const HOUSE_KEY = 'house'


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

export const groupOptions = [
    {value: '0', label: '自由民主党・無所属の会'},
    {value: '1', label: '立憲民主党・無所属'},
    {value: '2', label: '公明党'},
    {value: '3', label: '日本共産党'},
    {value: '4', label: '日本維新の会・無所属の会'},
    {value: '5', label: '国民民主党・無所属クラブ'},
]

export const houseOptions = [
    {value: '0', label: '衆議院'},
    {value: '1', label: '参議院'},
]

export const dietOptions = [200, 201, 202, 203, 204, 205, 206, 207, 208].map(x => {
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

export const getInitialGroups = (urlStr) => {
    return getInitialOptions(urlStr, GROUP_KEY, groupOptions);
}

export const getInitialSubmittedGroups = (urlStr) => {
    return getInitialOptions(urlStr, SUBMITTED_GROUP_KEY, groupOptions);
}

export const getInitialSupportedGroups = (urlStr) => {
    return getInitialOptions(urlStr, SUPPORTED_GROUP_KEY, groupOptions);
}

export const getInitialOpposedGroups = (urlStr) => {
    return getInitialOptions(urlStr, OPPOSED_GROUP_KEY, groupOptions);
}

export const getInitialHouses = (urlStr) => {
    return getInitialOptions(urlStr, HOUSE_KEY, houseOptions);
}

export const getInitialQuery = (urlStr) => {
    return new URL(urlStr).searchParams.get(QUERY_KEY) || "";
};

export const getInitialPage = (urlStr) => {
    return parseInt(new URL(urlStr).searchParams.get(PAGE_KEY) || '1');
}

export const buildBillUrlParamStr = (query, categories, statuses, diets, submittedDiets,
                                     submittedGroups, supportedGroups, opposedGroups, page) => {
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
    for (const diet of submittedDiets) {
        param.push(`${SUBMITTED_DIET_KEY}=${diet.value}`)
    }
    for (const group of submittedGroups) {
        param.push(`${SUBMITTED_GROUP_KEY}=${group.value}`)
    }
    for (const group of supportedGroups) {
        param.push(`${SUPPORTED_GROUP_KEY}=${group.value}`)
    }
    for (const group of opposedGroups) {
        param.push(`${OPPOSED_GROUP_KEY}=${group.value}`)
    }
    param.push(`${PAGE_KEY}=${page}`)
    return param.join('&')
}

export const buildMemberUrlParamStr = (query, groups, houses, page) => {
    const param = [];
    param.push(`${QUERY_KEY}=${encodeURI(query)}`)
    for (const group of groups) {
        param.push(`${GROUP_KEY}=${group.value}`)
    }
    for (const house of houses) {
        param.push(`${HOUSE_KEY}=${house.value}`)
    }
    param.push(`${PAGE_KEY}=${page}`)
    return param.join('&')
}
