import { generateRequestOptions } from './ApiErrorHandler';

describe('generateRequestOptions', () => {
    test('should return correct Request options', () => {
        const testMethod = 'POST';
        const testBody = { prop1: 'products' };

        const expectedResult = {
            method: testMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testBody)
        };

        const actualResult = generateRequestOptions(testMethod, testBody);

        expect(actualResult).toEqual(expectedResult);
    });
});
