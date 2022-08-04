import { Sale as SaleType } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export function getAllSales(): Promise<SaleType[]> {
    return fetch('http://localhost:7005/sales')
        .then(handleErrors)
        .then((data) => data.json());
}

type SaleData = Partial<SaleType>;

export function createSale({ amountSold, productId }: SaleData): Promise<SaleType[]> {
    const reqOptions = generateRequestOptions('POST', { amountSold, productId });

    return fetch('http://localhost:7005/sales', reqOptions)
        .then(handleErrors)
        .then((data) => data.json());
}
