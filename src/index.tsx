import React from 'react';
import ReactDOM from 'react-dom/client';
import SnackbarProvider from 'react-simple-snackbar';

import 'bootstrap/dist/css/bootstrap.css';
import './global.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>
);

reportWebVitals();
