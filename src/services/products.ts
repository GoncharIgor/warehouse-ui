import { Article as ArticleType, Product as ProductType } from '../models';
import { handleErrors } from '../utils/ApiErrorHandler';

export function getAllProducts(): Promise<ProductType[]> {
    return fetch('http://localhost:7005/products')
        .then(handleErrors)
        .then((data) => {
            return data.json();
        });
}

export function addProduct(product: ProductType) {
    return fetch('http://localhost:7005/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
    }).then((data) => data.json());
}

export const calculateMaximumAmountOfProductsThatCanBeSold = (articles: ArticleType[]): number => {
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
