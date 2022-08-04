import { Article } from '../models';
import { generateRequestOptions, handleErrors } from '../utils/ApiErrorHandler';

export async function getAllArticles(): Promise<Article[]> {
    return fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/articles`)
        .then(handleErrors)
        .then((data) => data.json());
}

export async function getArticleById(articleId: string): Promise<Article> {
    return fetch(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/articles/${articleId}`
    )
        .then(handleErrors)
        .then((data) => data.json());
}

export async function articlesBulkUpdate(updatedArticles: Article[]): Promise<Article[]> {
    const reqOptions = generateRequestOptions('PATCH', updatedArticles);

    return fetch(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/articles/`,
        reqOptions
    )
        .then(handleErrors)
        .then((data) => data.json());
}
