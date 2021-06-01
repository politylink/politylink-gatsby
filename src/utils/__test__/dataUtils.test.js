const {toDayOfWeek} = require("../dateUtils");
const {formatJsDate} = require("../dateUtils");

test('test formatJsDate', () => {
    expect(formatJsDate(new Date(2021, 5, 1))).toBe('2021/06/01');
})

test('test toDayOfWeek', () => {
    expect(toDayOfWeek(new Date(2021, 5, 1))).toBe('火');
})