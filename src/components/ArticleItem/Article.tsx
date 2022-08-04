import React from 'react';

import { Article } from '../../models';

import styles from './Article.module.scss';

interface ArticleProps {
    article: Article;
}

export const ArticleComponent = ({ article }: ArticleProps): JSX.Element => {
    return (
        <tr className={styles.article}>
            <td>{article.name}</td>
            <td>{article.amountRequired}</td>
            <td>{article.amountInStock}</td>
        </tr>
    );
};
