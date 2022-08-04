import { calculateMaximumAmountOfProductsThatCanBeSold } from './products';

const testArticles = [
    {
        id: '0517f083-0e15-4876-8d1f-6fa45900431c',
        name: 'Leg',
        amountInStock: 12,
        amountRequired: 4
    },
    {
        id: '831b92b8-677b-42cc-a585-335ea4ccccb6',
        name: 'Seat',
        amountInStock: 2,
        amountRequired: 1
    },
    {
        id: 'addc65a8-c759-41d8-a18a-89fe446ad484',
        name: 'Screw',
        amountInStock: 17,
        amountRequired: 8
    }
];

describe('calculateMaximumAmountOfProductsThatCanBeSold', () => {
    test('should return correct maximum amount of available products, based on minim article availability', () => {
        const actualResult = calculateMaximumAmountOfProductsThatCanBeSold(testArticles);

        expect(actualResult).toBe(2);
    });

    test('should return zero if at least 1 of the required articles is missing', () => {
        let clonedTestArticles = JSON.parse(JSON.stringify(testArticles));
        clonedTestArticles[0].amountInStock = 0;
        const actualResult = calculateMaximumAmountOfProductsThatCanBeSold(clonedTestArticles);

        expect(actualResult).toBe(0);
    });

    test('should return correct maximum amount of available products if "amountRequired" is equals zero', () => {
        let clonedTestArticles = JSON.parse(JSON.stringify(testArticles));

        clonedTestArticles[0].amountRequired = 0;
        const actualResult = calculateMaximumAmountOfProductsThatCanBeSold(clonedTestArticles);

        expect(actualResult).toBe(2);
    });
});
