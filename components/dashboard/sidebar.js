import React, { Component } from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { MdQueryBuilder } from 'react-icons/md';
import { AiFillFire } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';

function Sidebar({ imageSrc, title, workoutTime, calories, numWorkouts }) {
    return <div className={styles.sidebar}>
        <img className={styles.image} src={imageSrc} alt={title} />
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.bottom}>
            <div className={styles.info}>
                <MdQueryBuilder className={styles.icon} />
                <p className={styles.label}>{workoutTime}</p>
            </div>
            <div className={styles.info}>
                <AiFillFire className={styles.icon} />
                <p className={styles.label}>{calories}</p>
            </div>
            <div className={styles.info}>
                <FaRegChartBar className={styles.icon} />
                <p className={styles.label}>{numWorkouts} workouts</p>
            </div>
        </div>
    </div>
}

function SideInfo({ icon, text }) {
    return <div>

        <div className={styles.icon}>{icon}</div>
    </div>
}

export default Sidebar;