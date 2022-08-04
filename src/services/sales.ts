import { Sale as SaleType } from '../models';
import { handleErrors } from '../utils/ApiErrorHandler';

export function getAllSales(): Promise<SaleType[]> {
    return fetch('http://localhost:7005/sales')
        .then(handleErrors)
        .then((data) => data.json());
}
