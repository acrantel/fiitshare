import React, { Component } from 'react';
import styles from './labelled-input.module.css';

export default class LabelledInput extends React.Component {
    render() {
        const {
            label,
            onChange,
            slideIn
        } = this.props;
        return <label className={`${styles.wrapper} ${slideIn ? styles.slideIn : ''}`}>
            <span className={styles.label}>{label}</span>
            <input className={styles.input} type="text" onChange={onChange} />
        </label>;
    }
}
