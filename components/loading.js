import React, { Component } from 'react';
import styles from './loading.module.css';

export default class ErrorPage extends React.Component {
    render() {
        return <div className={styles.wrapper}>
            <img className={styles.wordLogo} src="/images/wordlogo.png" alt="Loading" />
            <img className={styles.iconLogo} src="/images/iconlogo.png" alt="Loading" />
        </div>;
    }
}
