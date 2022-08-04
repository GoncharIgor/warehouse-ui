import {Product as ProductType} from '../models';
import {handleErrors} from "../utils/ApiErrorHandler";

export function getAllProducts(): Promise<ProductType[]> {
    return fetch('http://localhost:7005/products')
        .then(handleErrors)
        .then((data) => {
        return data.json()
    });
}

export function addProduct(product: ProductType) {
    return fetch('http://localhost:7005/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({product})
    })
        .then(data => data.json())
}
