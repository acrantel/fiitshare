import React, { Component } from 'react';
import styles from './dashboard.module.css';
import WorkoutCard from '../cards/workout-card.js'
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';
import DashboardRight from './dashboard-right.js';
import { getWorkoutList, getUserGroups } from '../../utils/api';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentWorkouts: [],
            userGroups: []
        }
    }
    componentDidMount() {
        getWorkoutList(this.props.userDatum['recent_workouts'])
            .then(data => {
                this.setState({
                    recentWorkouts: data
                });
            });
        getUserGroups(this.props.userId)
            .then(data => {
                this.setState({
                    userGroups: data['yours']
                })
            });
    }
    render() {
        const { userId, userDatum, userDisplayName } = this.props;
        const { recentWorkouts, userGroups } = this.state;
        return <div className={styles.dashboard}>
            <DashboardCenter userId={userId} userDatum={userDatum}
                userDisplayName={userDisplayName} recentWorkouts={recentWorkouts} />
            <div className={styles.dashboardRight}>
                <DashboardRight userId={userId} userGroups={userGroups}/>
            </div>
        </div>
    }
}

function DashboardCenter({ userId, userDatum, userDisplayName, recentWorkouts }) {
    return <div className={styles.dashboardCenter}>

        <Recent userId={userId} userDatum={userDatum} userDisplayName={userDisplayName} recentWorkouts={recentWorkouts} />
        <Feed />
    </div>
}

function Recent({ userId, userDatum, userDisplayName, recentWorkouts }) {
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
            {recentWorkouts.map(workoutStuff => {
                return <li className={styles.listItem} key={workoutStuff['workoutId']}>
                    <WorkoutCard
                        workoutId={workoutStuff['workoutId']}
                        displayName={userDisplayName}
                        workoutDatum={workoutStuff['workoutDatum']}
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


export default Dashboard;