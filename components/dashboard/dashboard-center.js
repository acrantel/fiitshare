import React, { Component } from 'react';
import styles from './dashboard-center.module.css';
import {userData, workoutData, exerciseData, groupData} from '../../database/database.js';
import WorkoutCard from '../cards/workout-card.js'

class Dashboard extends React.Component {
    render () {
        return <div>
        </div>
    }
}

function Recent({userId}) {
    return <div className={styles.recentSection}>
        <h1 className={styles.sectionTitle}>Recent</h1>
        <ul className={styles.sectionList}>
            {userData[userId]['recent_workouts'].map(function(item) {
                return <WorkoutCard workoutId={item}/>
            })}
        </ul>
    </div>
}

export default Dashboard;