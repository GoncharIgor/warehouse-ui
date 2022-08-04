import React from 'react';
import { DateTime } from 'luxon';

import { Sale } from '../../models';

interface SaleProps {
    sale: Sale;
    productName: string;
}

export const SaleItem = ({ sale, productName }: SaleProps): JSX.Element => {
    return (
        <tr>
            <td>{DateTime.fromISO(sale.createdAt).toFormat('f')}</td>
            <td> {productName || sale.productId || 'N/A'}</td>
            <td> {sale.amountSold}</td>
        </tr>
    );
};
