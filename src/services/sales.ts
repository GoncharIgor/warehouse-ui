import { Sale } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export function getAllSales(): Promise<Sale[]> {
    return fetch('http://localhost:7005/sales')
        .then(handleErrors)
        .then((data) => data.json());
}

type SaleData = Partial<Sale>;

export function createSale({ amountSold, productId }: SaleData): Promise<Sale[]> {
    const reqOptions = generateRequestOptions('POST', { amountSold, productId });

    return fetch('http://localhost:7005/sales', reqOptions)
        .then(handleErrors)
        .then((data) => data.json());
}
