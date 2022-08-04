import { Article, Product } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export async function getAllProducts(): Promise<Product[]> {
    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/products`)
        .then(handleErrors)
        .then((data) => {
            return data.json();
        });
}

export async function getProductById(productId: string): Promise<Product> {
    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/products/${productId}`)
        .then(handleErrors)
        .then((data) => data.json());
}

export async function addProduct(product: Product) {
    const reqOptions = generateRequestOptions('POST', { product });

    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/products`, reqOptions).then((data) => data.json());
}

export const calculateMaximumAmountOfProductsThatCanBeSold = (articles: Article[]): number => {
    if (!articles.length) return 0;

    let possibleAmountOfProductsPerArticle = [];

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].amountInStock === 0) {
            possibleAmountOfProductsPerArticle.push(0);
        } else if (!articles[i].amountRequired) {
            // in case smb by mistake put "0" value in DB
            continue;
        } else {
            possibleAmountOfProductsPerArticle.push(
                Math.floor(articles[i].amountInStock / articles[i].amountRequired!)
            );
        }
    }

    return Math.min(...possibleAmountOfProductsPerArticle);
};
