import React, { Component } from 'react';
import styles from './dashboard.module.css';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import Link from 'next/link';

function DashboardRight({ userId }) {
    let result;
    if (userData[userId]['groups'] === undefined) {
        userData[userId]['groups'] = []
    }
    return <div>
        <h1 id='groups-header' className='section-title'><span>Groups</span></h1>
        {
            userData[userId]['groups'].length == 0
                ? <a href="#">Join a Group</a>
                : userData[userId]['groups'].map(function (item) {
                    return <Link key={item} href="/group/[groupid]" as={`/group/${item}`}>
                        <a className={styles.groupLink}><img className={styles.groupImg} src={groupData[item].image} /></a>
                    </Link>;

                })
        }
    </div>;
}

export default DashboardRight;