import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Product as ProductType, Sale as SaleType } from '../../models';

import styles from './SalesList.module.scss';
import { getAllSales } from '../../services/sales';
import { getProductById } from '../../services/products';
import { SaleItem } from '../SaleItem/SaleItem';

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
        return sales
            .sort(function (a, b) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .map((sale: SaleType) => <SaleItem sale={sale} key={sale.id} />);
    };

    return (
        <div className={styles['sales-list']}>
            <h2 className="global-header-2">Sales List</h2>
            {isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <table className="global-borderless-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Amount Sold</th>
                        </tr>
                    </thead>
                    <tbody>{renderSales()}</tbody>
                </table>
            )}
            {errorMessage && <div className="global-error-message">{errorMessage}</div>}
        </div>
    );
};
