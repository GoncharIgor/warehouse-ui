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

    let possibleAmountPerArticle = [];

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].amountInStock === 0) {
            possibleAmountPerArticle.push(0);
        } else if (!articles[i].amountRequired) {
            continue;
        } else {
            possibleAmountPerArticle.push(
                Math.floor(articles[i].amountInStock / articles[i].amountRequired!)
            );
        }
    }

    return Math.min.apply(null, possibleAmountPerArticle.filter(Boolean));
};
