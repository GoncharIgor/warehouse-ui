import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

import styles from './SaleForm.module.scss';

interface SaleFormProps {
    maxAmountOfProductsForSale: number;
    submitHandler: (numberOfProductsThatUserWantsToBuy: number) => void;
}

export const SaleForm = ({
    maxAmountOfProductsForSale,
    submitHandler
}: SaleFormProps): JSX.Element => {
    const [selectedAmountOfProducts, setSelectedAmountOfProducts] = useState(0);

    const submitSelection = (selectedAmountOfProducts: number) => {
        submitHandler(selectedAmountOfProducts);
        setSelectedAmountOfProducts(0);
    }

    return (
        <div className={styles['sale-form']}>
            <DropdownButton disabled={maxAmountOfProductsForSale === 0} id="products-amount" title="Available amount">
                {[...Array(maxAmountOfProductsForSale)].map((e, i) => (
                    <Dropdown.Item key={i} onClick={() => setSelectedAmountOfProducts(i + 1)}>
                        {i + 1}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <div>To sale: <strong>{selectedAmountOfProducts}</strong></div>
            <Button
                variant="primary"
                disabled={selectedAmountOfProducts === 0}
                onClick={() => submitSelection(selectedAmountOfProducts)}
            >
                Sale
            </Button>{' '}
        </div>
    );
};
