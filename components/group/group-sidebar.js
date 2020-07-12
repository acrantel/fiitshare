import React, { Component } from 'react';
import styles from '../dashboard/sidebar.module.css';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js'
import { BsFillPeopleFill} from 'react-icons/bs';
import {AiFillThunderbolt} from 'react-icons/ai';

export default function GroupSidebar({ groupID }) {
    let group = groupData[groupID]
    return <div className={styles.sidebar}>
        <img className={styles.image} src={group['image']} alt={group['name']} />
        <h1 className={styles.title}>{group['name']}</h1>
        <h2 className={styles.description}>{group['description']}</h2>
        <div className={styles.bottom}>
            <div className={styles.info}>
                <BsFillPeopleFill className={styles.icon} />
                <p className={styles.label}>{group['members'].length}</p>
            </div>
            <div className={styles.info}>
                <AiFillThunderbolt className={styles.icon} />
                <p className={styles.label}>{group['level']}</p>
            </div>
        </div>
    </div>
}