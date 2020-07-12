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
        <Recent userId={userId} />
    </div>
}

function Recent({ userId }) {
    return <div className={styles.recentSection}>
        <h1 className={styles.sectionTitle}>Recent</h1>
        <ul className={styles.sectionList}>
            {userData[userId]['recent_workouts'].map(function (item) {
                return <li className={styles.listItem}><WorkoutCard workoutId={item} /></li>
            })}
        </ul>
    </div>
}

function DashboardRight({ userId }) {
    let result;
    if (userData[userId]['groups'] === undefined) {
        userData[userId]['groups'] = []
    }
    if (userData[userId]['groups'].length == 0) {
        result = <div className={styles.dashboardRight}>
            <h1>Groups</h1>
            <href>Join a Group</href>
        </div>
    } else {
        result = <div>
            <h1>Groups</h1>
            {userData[userId]['groups'].map(function (item) {
                return <href>{item}</href>
            })}
        </div>
    }
    return result;
}


export default Dashboard;