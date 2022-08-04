import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Product } from '../../models';
import { ProductItem } from '../ProductItem/ProductItem';
import { getAllProducts } from '../../services/products';

import styles from './ProductList.module.scss';

export const ProductList = (): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        getAllProducts()
            .then((loadedProducts) => {
                if (mounted) {
                    setProducts(loadedProducts);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setErrorMessage('Unable to fetch products from our Database');
                setIsLoading(false);
            });

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
            {errorMessage && <div className="global-error-message">{errorMessage}</div>}
        </div>
    );
};
