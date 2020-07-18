import React, { Component } from 'react';
import styles from './loading.module.css';

export default class ErrorPage extends React.Component {
    render() {
        return <div className={styles.wrapper}>
            <img className={styles.logo} src="/images/logo.png" alt="Loading" />
        </div>;
    }
}
