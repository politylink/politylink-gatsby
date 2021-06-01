import {translateBillActionType} from "../formatUtils";

test('test translateBillActions', () => {
    expect(translateBillActionType('BILL_EXPLANATION')).toBe('趣旨説明');
    expect(translateBillActionType('INVALID')).toBe(null);
})