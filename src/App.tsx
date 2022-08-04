import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
// import logo from './assets/logo.svg';

import { Header, ProductList } from './components';

import styles from './App.module.scss';
import { SalesList } from './components/SalesList/SalesList';
import { Tab } from 'react-bootstrap';

function App() {
    return (
        <div className={styles.app}>
            <Header title="Warehouse Manager" />
            <div className="global-container">
                <Tabs defaultActiveKey="product-list" className="mb-3">
                    <Tab eventKey="product-list" title="Products">
                        <ProductList />
                    </Tab>
                    <Tab eventKey="sales" title="Sales">
                        <SalesList />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default App;
