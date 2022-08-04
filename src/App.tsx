import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import { Tab } from 'react-bootstrap';
import { Box, CashStack } from 'react-bootstrap-icons';

import { Header, ProductList } from './components';

import styles from './App.module.scss';
import { SalesList } from './components/SalesList/SalesList';

function App() {
    return (
        <div className={styles.app}>
            <Header title="Warehouse Manager" />
            <div className="global-container">
                <Tabs defaultActiveKey="product-list" className="mb-3">
                    <Tab
                        eventKey="product-list"
                        title={
                            <span>
                                <Box className={styles['tab-icon']} />
                                {'Products'}
                            </span>
                        }
                    >
                        <ProductList />
                    </Tab>
                    <Tab
                        eventKey="sales"
                        title={
                            <span>
                                <CashStack className={styles['tab-icon']} />
                                {'Sales'}
                            </span>
                        }
                    >
                        <SalesList />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default App;
