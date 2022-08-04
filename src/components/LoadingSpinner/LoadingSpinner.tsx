import React from 'react';
import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className={styles["loading-spinner"]}></div>
        </div>
    );
}
