import { Article } from '../../models';
import styles from '../Product/Product.module.scss';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

interface SaleFormProps {
    maxAmountOfProductsForSale: number;
    selectHandler: (numberOfProductsThatUserWantsToBuy: number) => void;
}

export const SaleForm = ({
    maxAmountOfProductsForSale,
    selectHandler
}: SaleFormProps): JSX.Element => {
    const [selectedAmountOfProducts, setSelectedAmountOfProducts] = useState(0);

    return (
        <div className={styles['sale-form']}>
            <DropdownButton id="products-amount" title="Available amount">
                {[...Array(maxAmountOfProductsForSale)].map((e, i) => (
                    <Dropdown.Item key={i} onClick={() => setSelectedAmountOfProducts(i + 1)}>
                        {i + 1}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <Button
                variant="primary"
                disabled={selectedAmountOfProducts === 0}
                onClick={() => selectHandler(selectedAmountOfProducts)}
            >
                Sale
            </Button>{' '}
        </div>
    );
};
