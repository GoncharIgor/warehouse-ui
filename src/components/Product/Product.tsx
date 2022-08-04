import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { Article as ArticleType, Product as ProductType } from '../../models';

import styles from './Product.module.scss';
import { getArticleById } from '../../services/articles';
import { ArticleComponent } from '../Article/Article';

interface ProductProps {
    product: ProductType;
}

export const Product = ({ product }: ProductProps): JSX.Element => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [dataFetchFinished, setDataFetchFinished] = useState<boolean>(false);

    useEffect(() => {
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

    const calculateMaximumSale = (): number => {
        if (!articles.length) return 0;

        let possibleAmountPerArticle = [];

        for (let i = 0; i < articles.length; i++) {
            if (articles[i].amountInStock === 0) {
                possibleAmountPerArticle.push(0)
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

    const selectHandler = (value: number) => {
        console.log(value);
    };

    const renderSaleForm = () => {
        const maxAmountOfProductsForSale = calculateMaximumSale();

        return (
            <div className={styles['sale-form']}>
                <DropdownButton id="products-amount" title="Available amount">
                    {[...Array(maxAmountOfProductsForSale)].map((e, i) => (
                        <Dropdown.Item key={i} onClick={() => selectHandler(i+1)}>{i+1}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <Button variant="primary">Sale</Button>{' '}
            </div>
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
