import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Product } from '../../models';
import { ProductItem } from '../ProductItem/ProductItem';
import { getAllProducts } from '../../services/products';

import styles from './ProductList.module.scss';
import { useArticleStore } from '../../stores/articles';
import { getAllArticles } from '../../services/articles';
import { useProductsStore } from '../../stores/products';

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

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        (async () => {
            try {
                const loadedProductsFromApi = await getAllProducts();
                console.log('Products loaded:', loadedProductsFromApi.length);
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
                console.log('Articles loaded:', loadedArticlesFromApi.length);
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
