import { useEffect, useState } from 'react';

import {Product as ProductType, Sale as SaleType} from '../../models';
import { Product } from '../Product/Product';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import styles from './SalesList.module.scss';
import { getAllProducts } from '../../services/products';
import {getAllSales} from "../../services/sales";

export const SalesList = (): JSX.Element => {
    const [sales, setSales] = useState<SaleType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        getAllSales()
            .then((loadedProducts) => {
                if (mounted) {
                    setSales(loadedProducts);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setErrorMessage('Unable to fetch sales from our Database');
                setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    const renderSales = () => {
        return sales.map((sale: SaleType) => {
            return <p key={sale.id}>{sale.amountSold}</p>;
        });
    };

    return (
        <div>
            <h2 className="global-header-2">Sales List</h2>
            {isLoading ? <LoadingSpinner /> : <div className={styles.list}>{renderSales()}</div>}
            {errorMessage && <div className="global-error-message">{errorMessage}</div>}
        </div>
    );
};
