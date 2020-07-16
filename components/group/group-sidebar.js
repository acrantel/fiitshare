import React, { Component } from 'react';
import styles from '../dashboard/sidebar.module.css';
import { BsFillPeopleFill} from 'react-icons/bs';
import {AiFillThunderbolt} from 'react-icons/ai';

export default function GroupSidebar({ groupId, groupDatum }) {
    return <div className={styles.sidebar}>
        <img className={styles.image} src={groupDatum['image']} alt={groupDatum['name']} />
        <h1 className={styles.title}>{groupDatum['name']}</h1>
        <p className={styles.description}>{groupDatum['description']}</p>
        <div className={styles.bottom}>
            <div className={styles.info}>
                <BsFillPeopleFill className={styles.icon} />
                <p className={styles.label}>{groupDatum['members'].length}</p>
            </div>
            <div className={styles.info}>
                <AiFillThunderbolt className={styles.icon} />
                <p className={styles.label}>{groupDatum['level']}</p>
            </div>
        </div>
    </div>
}