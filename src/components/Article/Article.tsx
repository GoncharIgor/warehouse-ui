import React, { useEffect, useState } from 'react';

import {Article as ArticleType} from '../../models';

import styles from './Article.module.scss';

interface ArticleProps {
    article: ArticleType;
}

export const ArticleComponent = ({ article }: ArticleProps): JSX.Element => {

    return (
        <tr className={styles.article}>
            <td>
                {article.name}
            </td>
            <td>
                {article.amountRequired}
            </td>
            <td>{article.amountInStock}</td>
        </tr>
    );
};
