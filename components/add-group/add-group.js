import React, { Component } from 'react';
import styles from './add-group.module.css';

import Link from 'next/link'

export default class AddGroup extends React.Component {
    constructor(props)
    {
        super(props);
    }

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
                    <a onClick={onSubmit} className='button'>{submitLabel}</a>
            </div>
        </form>;
    }
}
