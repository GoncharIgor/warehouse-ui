import { useEffect, useState } from 'react';

import { Product as ProductType } from '../../models';
import { Product } from '../Product/Product';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import styles from './ProductList.module.scss';
import { getAllProducts } from '../../services/products';

export const ProductList = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>([]);
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
        return products.map((product: ProductType) => {
            return <Product key={product.id} product={product} />;
        });
    };

    return (
        <div>
            <h2 className="global-header-2">Products List</h2>
            {isLoading ? <LoadingSpinner /> : <div className={styles.list}>{renderProducts()}</div>}
            {errorMessage && <div className="global-error-message">{errorMessage}</div>}
        </div>
    );
};
