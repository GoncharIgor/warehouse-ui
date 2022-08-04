import { Sale } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export async function getAllSales(): Promise<Sale[]> {
    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/sales`)
        .then(handleErrors)
        .then((data) => data.json());
}

type SaleData = Partial<Sale>;

export async function createSale({ amountSold, productId }: SaleData): Promise<Sale> {
    const reqOptions = generateRequestOptions('POST', { amountSold, productId });

    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/sales`, reqOptions)
        .then(handleErrors)
        .then((data) => data.json());
}
