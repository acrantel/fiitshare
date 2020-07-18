import React, { Component } from 'react';
import styles from './dashboard-right.module.css';
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
                ? <Link href="/join-group"><a className={`button ${styles.joinGroup}`}>Join a Group</a></Link>
                : userGroups.map(function ({ id, name, image }) {
                    return <Link key={id} href="/group/[groupid]" as={`/group/${id}`}>
                        <a className={styles.groupLink}>
                            <div className={styles.groupImgWrapper}>
                                <img className={styles.groupImg} src={image} />
                                <div className={styles.groupName}>{name}</div>
                            </div>
                        </a>
                    </Link>;

                })
        }
    </div>;
}

export default DashboardRight;