import React, { Component } from 'react';
import styles from './dashboard.module.css';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import WorkoutCard from '../cards/workout-card.js'
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

class Dashboard extends React.Component {
    render() {
        return <div className={styles.dashboard}>
            <DashboardCenter userId={this.props.userId} />
            <DashboardRight userId={this.props.userId} />
        </div>
    }
}

function DashboardCenter({ userId }) {
    return <div className={styles.dashboardCenter}>

        <Recent userId={userId} />
        <Feed />
    </div>
}

function Recent({ userId }) {
    return <div className={styles.recentSection}>
        <div className={styles.recentHeader}>
            <h1 className='section-title'><span>Recent</span></h1>

            <div className={styles.recentHeaderButton}>
                <Link href='/create-workout'>
                    <a className={['button', styles.dashboardCenterButtonContent].join(' ')}>
                        <div className={styles.dashboardCenterButtonIcon}>
                            <MdAddCircleOutline /></div>
                        <div className={styles.dashboardCenterButtonText}>Create a new workout</div>
                    </a>
                </Link>
            </div>
        </div>

        <ul className={styles.sectionList}>
            {userData[userId]['recent_workouts'].map(function (item) {
                return <li className={styles.listItem} key={item}>
                    <WorkoutCard
                        workoutId={item}
                        workoutDatum={workoutData[item]}
                    />
                </li>
            })}
        </ul>
    </div>
}

function Feed() {
    return <div>
        <h1 className='section-title'><span>Feed</span></h1>
    </div>
}

function DashboardRight({ userId }) {
    let result;
    if (userData[userId]['groups'] === undefined) {
        userData[userId]['groups'] = []
    }
    return <div className={styles.dashboardRight}>
        <h1 className='section-title'><span>Groups</span></h1>
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


export default Dashboard;