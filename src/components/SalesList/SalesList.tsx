import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Sale } from '../../models';

import styles from './SalesList.module.scss';
import { getAllSales } from '../../services/sales';
import { SaleItem } from '../SaleItem/SaleItem';
import { useSalesStore } from '../../stores/sales';
import { useProductsStore } from '../../stores/products';

export const SalesList = (): JSX.Element => {
    const { sales, setSales, setIsFetchingSalesFromApiErrorOccurred, fetchSalesFromServerError } =
        useSalesStore();
    const { getProductById } = useProductsStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        (async () => {
            try {
                const loadedSalesFromApi = await getAllSales();
                console.log('Sales loaded:', loadedSalesFromApi.length);
                setSales(loadedSalesFromApi);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsFetchingSalesFromApiErrorOccurred('Unable to fetch sales from the Database');
                setIsLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const renderSales = () => {
        return sales
            .sort(function (a, b) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .map((sale: Sale) => {
                const product = getProductById(sale.productId);

                return <SaleItem sale={sale} key={sale.id} productName={product?.name} />;
            });
    };

    return (
        <div className={styles['sales-list']}>
            <h2 className="global-header-2">Sales List</h2>
            {isLoading ? (
                <Spinner animation="border" variant="primary" />
            ) : fetchSalesFromServerError ? (
                <div className="global-error-message">{fetchSalesFromServerError}</div>
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
        </div>
    );
};
