import React, { Component } from 'react';
import styles from './add-group.module.css';

export default class AddGroup extends React.Component {
    render() {
        const {
            title,
            children,
            submitLabel,
            onSubmit
        } = this.props;
        return <form className={styles.wrapper} onSubmit={onSubmit}>
            <h2 className={styles.heading}>{title}</h2>
            {children}
            <div className={styles.submitWrapper}>
                <input
                    type="submit"
                    value={submitLabel}
                    className={styles.submit}
                />
            </div>
        </form>;
    }
}
