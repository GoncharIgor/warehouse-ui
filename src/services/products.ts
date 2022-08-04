import { Article, Product } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export function getAllProducts(): Promise<Product[]> {
    return fetch('http://localhost:7005/products')
        .then(handleErrors)
        .then((data) => {
            return data.json();
        });
}

export function getProductById(productId: string): Promise<Product> {
    return fetch(`http://localhost:7005/products/${productId}`)
        .then(handleErrors)
        .then((data) => data.json());
}

export function addProduct(product: Product) {
    const reqOptions = generateRequestOptions('POST', { product });

    return fetch('http://localhost:7005/products', reqOptions).then((data) => data.json());
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
