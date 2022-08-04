import React from 'react';

import { Article } from '../../models';

interface ArticleProps {
    article: Article;
}

export const ArticleItem = ({ article }: ArticleProps): JSX.Element => {
    return (
        <tr className="article">
            <td>{article.name}</td>
            <td>{article.amountRequired}</td>
            <td>{article.amountInStock}</td>
        </tr>
    );
};
