import React, { Component } from 'react';
import styles from './dashboard-right.module.css';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import Link from 'next/link';

function DashboardRight({ userId, userGroups }) {
    let result;
    if (userGroups === undefined) {
        userGroups = []
    }
    return <div className={styles.groupsContainer}>
        <h1 className='section-title'><span>Groups</span></h1>
        {
            userGroups.length == 0
                ? <a href="#">Join a Group</a>
                : userGroups.map(function (item) {
                    return <Link key={item['id']} href="/group/[groupid]" as={`/group/${item['id']}`}>
                        <a className={styles.groupLink}>
                            <div className={styles.groupImgWrapper}>
                                <img className={styles.groupImg} src={item['image'].image} />
                                <div className={styles.groupName}>
                                    {item['name'].name}
                                </div>
                            </div>
                        </a>
                    </Link>;

                })
        }
    </div>;
}

export default DashboardRight;