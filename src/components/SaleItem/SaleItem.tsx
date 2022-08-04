import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { Sale } from '../../models';

import { getProductById } from '../../services/products';
import { useProductsStore } from '../../stores/products';

interface SaleProps {
    sale: Sale;
}

/* const product = await getProductById(sale.productId);
  console.log(product);
  */

export const SaleItem = ({ sale }: SaleProps): JSX.Element => {
    const { products } = useProductsStore();

    const [productName, setProductName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);

        getProductById(sale.productId)
            .then((loadedProduct) => {
                if (mounted) {
                    setProductName(loadedProduct.name);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setErrorMessage('Unable to fetch product info from our Database');
                setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <tr>
            {!isLoading && (
                <>
                    <td>{DateTime.fromISO(sale.createdAt).toFormat('f')}</td>
                    <td> {productName || sale.productId || 'N/A'}</td>
                    <td> {sale.amountSold}</td>
                </>
            )}
        </tr>
    );
};
