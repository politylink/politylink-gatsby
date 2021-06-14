import {categoryOptions, getInitialCategories, getInitialOptions, getInitialStatuses} from "../apiUtils";

test('test getInitialOptions', () => {
    const urlStr = 'https://politylink.jp/bills/index2/?q=&category=0&category=2&page=1'

    const categories = getInitialCategories(urlStr)
    expect(categories.length).toBe(2);
    expect(categories[0].value).toBe('0');
    expect(categories[1].value).toBe('2');

    const statues = getInitialStatuses(urlStr);
    expect(statues.length).toBe(0);
})