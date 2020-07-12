import React, { Component } from 'react';
import styles from './dashboard.module.css';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import WorkoutCard from '../cards/workout-card.js'

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
        <a href="#">Create new</a>
        <Recent userId={userId} />
        <Feed />
    </div>
}

function Recent({ userId }) {
    return <div className={styles.recentSection}>
        <h1 className='section-title'><span>Recent</span></h1>
        <ul className={styles.sectionList}>
            {userData[userId]['recent_workouts'].map(function (item) {
                return <li className={styles.listItem}>
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
                    return <a href="#" className={styles.groupLink}>{item}</a>
                })
        }
    </div>;
}


export default Dashboard;