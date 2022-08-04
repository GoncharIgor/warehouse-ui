import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

import { Article, Product } from '../../models';

import { getArticleById } from '../../services/articles';
import { ArticleComponent } from '../ArticleItem/Article';
import { calculateMaximumAmountOfProductsThatCanBeSold } from '../../services/products';
import { SaleForm } from '../SaleForm/SaleForm';
import { createSale } from '../../services/sales';

import styles from './ProductItem.module.scss';
import { useArticleStore } from '../../stores/articles';

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
    const [productArticles, setProductArticles] = useState<Article[]>([]);
    const { articles, isLoading } = useArticleStore();

    const [openSnackbar] = useSnackbar(snackBarOptions);

    useEffect(() => {
        if (!articles) {
            setProductArticles([]);
        }

        let allArticlesPerProductResult: Article[] = [];
        // const articleIdsPerProduct = product.articles.map((article) => article.id);
        const articleIdsPerProduct = product.articles.map((article) => {
            let foundArticle = articles.find((articleInStore) => articleInStore.id === article.id);

            if (foundArticle) {
                foundArticle.amountRequired = article.amountRequired;
                allArticlesPerProductResult.push(foundArticle);
            }
        });

        /*const allArticlesPerProduct = articles.filter((articleInStore) =>
            articleIdsPerProduct.includes(articleInStore.id)
        );
        setProductArticles(allArticlesPerProduct);*/
        setProductArticles(allArticlesPerProductResult);
    }, [articles]);

    const saleSubmitHandler = (numberOfProductsThatUserWantsToBuy: number) => {
        createSale({
            amountSold: numberOfProductsThatUserWantsToBuy,
            productId: product.id
        })
            .then((res) => {
                // @ts-ignore
                openSnackbar(`${product.name} was sold in amount of ${res.amountSold}`);
            })
            .catch((err) => {
                console.log(err);
                console.log('Error occured while adding sale');
            });
    };

    const renderSaleForm = () => {
        const maxAmountOfProductsForSale =
            calculateMaximumAmountOfProductsThatCanBeSold(productArticles);

        // const maxAmountOfProductsForSale = 2;

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
                                <th>Total</th>
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
