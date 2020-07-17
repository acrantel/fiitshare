import React, { Component } from 'react';
import styles from './error.module.css';

export default class ErrorPage extends React.Component {
    render() {
        const {
            error
        } = this.props;
        return <div className={styles.wrapper}>
            {error} :(
        </div>;
    }
}
