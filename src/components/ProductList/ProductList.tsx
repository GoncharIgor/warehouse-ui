import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Product } from '../../models';
import { ProductItem } from '../../components';
import { getAllProducts, getAllArticles } from '../../services';

import { useArticleStore } from '../../stores/articles';
import { useProductsStore } from '../../stores/products';

import styles from './ProductList.module.scss';

export const ProductList = (): JSX.Element => {
    const { setArticles, setIsFetchingArticlesFromApiErrorOccurred, setIsLoadingArticles } =
        useArticleStore();
    const {
        setProducts,
        products,
        setIsFetchingProductsFromApiErrorOccurred,
        fetchProductsFromServerError
    } = useProductsStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 2 GET requests for products and articles are loaded in parallel in 2 separate useEffect hooks
    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        (async () => {
            try {
                const loadedProductsFromApi = await getAllProducts();
                setProducts(loadedProductsFromApi);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsFetchingProductsFromApiErrorOccurred(
                    'Unable to fetch products from the Database'
                );
                setIsLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setIsLoadingArticles(true);
                const loadedArticlesFromApi = await getAllArticles();
                setArticles(loadedArticlesFromApi || []);
                setIsLoadingArticles(false);
            } catch (err) {
                console.log(err);
                setIsFetchingArticlesFromApiErrorOccurred(true);
                setIsLoadingArticles(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const renderProducts = () => {
        return products.map((product: Product) => {
            return <ProductItem key={product.id} product={product} />;
        });
    };

    return (
        <div className={styles['product-list']}>
            <h2 className="global-header-2">Products List</h2>
            {isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <div className={styles['product-items']}>{renderProducts()}</div>
            )}
            {!!fetchProductsFromServerError && (
                <div className="global-error-message">{fetchProductsFromServerError}</div>
            )}
        </div>
    );
};
