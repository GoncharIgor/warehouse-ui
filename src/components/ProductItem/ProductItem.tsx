import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

import { Article, Product } from '../../models';
import { ArticleComponent } from '../ArticleItem/Article';
import { calculateMaximumAmountOfProductsThatCanBeSold } from '../../services/products';
import { SaleForm } from '../SaleForm/SaleForm';
import { createSale } from '../../services/sales';

import { useArticleStore } from '../../stores/articles';
import { useSalesStore } from '../../stores/sales';

import styles from './ProductItem.module.scss';
import { articlesBulkUpdate } from '../../services/articles';

interface ProductProps {
    product: Product;
}

const snackBarOptions = {
    style: {
        backgroundColor: 'rgb(0 128 0 / 28%)',
        color: 'black',
        fontSize: '18px'
    },
    closeStyle: {
        color: 'black',
        fontSize: '16px'
    }
};

export const ProductItem = ({ product }: ProductProps): JSX.Element => {
    const { articles, isLoading, getArticleById, fetchArticlesFromServer, bulkUpdate } = useArticleStore();
    const { addSale } = useSalesStore();

    const [productArticles, setProductArticles] = useState<Article[]>([]);

    const [openSnackbar] = useSnackbar(snackBarOptions);

    useEffect(() => {
        if (!articles) {
            setProductArticles([]);
        }

        let allArticlesPerProductResult: Article[] = [];
        product.articles.forEach((article) => {
            let foundArticle = articles.find((articleInStore) => articleInStore.id === article.id);

            if (foundArticle) {
                foundArticle.amountRequired = article.amountRequired;
                allArticlesPerProductResult.push(foundArticle);
            }
        });

        setProductArticles(allArticlesPerProductResult);
    }, [articles]);

    const saleSubmitHandler = (numberOfProductsThatUserWantsToBuy: number) => {
        createSale({
            amountSold: numberOfProductsThatUserWantsToBuy,
            productId: product.id
        })
            .then((newlyAddedSale) => {
                // because we only display sales for current user - we can update salesStore
                // and display updated data to user, without additional request to server
                addSale(newlyAddedSale);

                let articlesForBulkUpdate: Article[] = [];

                product.articles.forEach((article) => {
                    const clonedArticleFromStore = JSON.parse(
                        JSON.stringify(getArticleById(article.id))
                    ) as Article;
                    clonedArticleFromStore.amountInStock -=
                        article.amountRequired * numberOfProductsThatUserWantsToBuy;
                    delete clonedArticleFromStore.amountRequired;

                    articlesForBulkUpdate.push(clonedArticleFromStore);
                });

                articlesBulkUpdate(articlesForBulkUpdate)
                    .then((response: Article[]) => {
                        bulkUpdate(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                openSnackbar(`${product.name} was sold in amount of ${newlyAddedSale.amountSold}`);
            })
            .catch((err) => {
                console.log(err);
                openSnackbar(`Error occurred while adding ${product.name} sale`);
            });
    };

    const renderSaleForm = () => {
        const maxAmountOfProductsForSale =
            calculateMaximumAmountOfProductsThatCanBeSold(productArticles);

        return (
            <SaleForm
                maxAmountOfProductsForSale={maxAmountOfProductsForSale}
                submitHandler={saleSubmitHandler}
            />
        );
    };

    const renderArticles = () => {
        return productArticles.map((article: Article) => {
            return <ArticleComponent key={`${product}-${article.id}`} article={article} />;
        });
    };

    return (
        <div className={styles.product}>
            <h4>{product.name}</h4>
            {isLoading ? (
                <div className={styles['loading-message']}>Loading articles...</div>
            ) : !!productArticles.length ? (
                <>
                    <table className="global-borderless-table">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Required</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>{renderArticles()}</tbody>
                    </table>
                    {renderSaleForm()}
                </>
            ) : (
                <div className="global-error-message">
                    {'Could not load articles from Database'}
                </div>
            )}
        </div>
    );
};
