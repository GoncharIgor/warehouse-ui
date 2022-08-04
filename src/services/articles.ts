import {Article as ArticleType} from '../models';
import {handleErrors} from "../utils/ApiErrorHandler";

export function getAllArticles(): Promise<ArticleType[]> {
    return fetch('http://localhost:7005/articles').then((data) => data.json());
}

export function getArticleById(articleId: string): Promise<ArticleType> {
    return fetch(`http://localhost:7005/articles/${articleId}`)
        .then(handleErrors)
        .then((data) => data.json());
}
