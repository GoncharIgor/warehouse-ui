import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { Article as ArticleType, Product as ProductType } from '../../models';

import styles from './Product.module.scss';
import { getArticleById } from '../../services/articles';
import { ArticleComponent } from '../Article/Article';
import { calculateMaximumAmountOfProductsThatCanBeSold } from '../../services/products';
import { SaleForm } from '../SaleForm/SaleForm';

interface ProductProps {
    product: ProductType;
}

export const Product = ({ product }: ProductProps): JSX.Element => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [dataFetchFinished, setDataFetchFinished] = useState<boolean>(false);

    useEffect(() => {
        // We render articles list only if all related articles are successfully fetched
        // Partial information will lead to incorrect operations of warehouse employees
        const promises = product.articles.map((article) => {
            return getArticleById(article.id).then((loadedArticle) => {
                loadedArticle.amountRequired = article.amountRequired;
                return loadedArticle;
            });
        });

        Promise.all(promises)
            .then((fetchedArticlesForCurrentProduct) => {
                const filteredSuccessfulArticlesForCurrentProduct =
                    fetchedArticlesForCurrentProduct.filter((article) => !!article.name);

                setArticles(filteredSuccessfulArticlesForCurrentProduct);
                setDataFetchFinished(true);
            })
            .catch((error) => {
                setDataFetchFinished(true);
                setErrorMessage('Could not retrieve articles for this product from Database');
            });
    }, []);

    const selectHandler = (numberOfProductsThatUserWantsToBuy: number) => {
        console.log(numberOfProductsThatUserWantsToBuy);
    };

    const renderSaleForm = () => {
        const maxAmountOfProductsForSale = calculateMaximumAmountOfProductsThatCanBeSold(articles);
        return (
            <SaleForm
                maxAmountOfProductsForSale={maxAmountOfProductsForSale}
                selectHandler={selectHandler}
            />
        );
    };

    const renderArticles = () => {
        return articles.map((article: ArticleType) => {
            return <ArticleComponent key={`${product}-${article.id}`} article={article} />;
        });
    };

    return (
        <div className={styles.product}>
            <h4>{product.name}</h4>
            {!dataFetchFinished ? (
                <div>Loading Articles...</div>
            ) : articles.length === product.articles.length ? (
                <>
                    <table className={styles['articles-table']}>
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Required</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>{renderArticles()}</tbody>
                    </table>
                    {renderSaleForm()}
                </>
            ) : (
                <div className="global-error-message">
                    {errorMessage || 'Could not load articles'}
                </div>
            )}
        </div>
    );
};
