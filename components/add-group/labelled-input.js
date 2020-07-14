import React, { Component } from 'react';
import styles from './labelled-input.module.css';

export default class LabelledInput extends React.Component {
    render() {
        const {
            label,
            slideIn,
            children
        } = this.props;
        return <label className={`${styles.wrapper} ${slideIn ? styles.slideIn : ''}`}>
            <span className={styles.label}>{label}</span>
            {children}
        </label>;
    }
}
