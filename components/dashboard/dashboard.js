import React, { Component } from 'react';
import styles from './dashboard.module.css';
import WorkoutCard from '../cards/workout-card.js'
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';
import DashboardRight from './dashboard-right.js';
import { getUserWorkouts } from '../../utils/api';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutData: []
        }
    }
    componentDidMount() {
        getUserWorkouts(this.props.userId)
            .then(data => {
                this.setState({
                    workoutData: data
                });
            });
    }
    render() {
        const { userId, userDatum, userDisplayName } = this.props;
        const { workoutData } = this.state;
        return <div className={styles.dashboard}>
            <DashboardCenter userId={userId} userDatum={userDatum}
                userDisplayName={userDisplayName} workoutData={workoutData} />
            <div className={styles.dashboardRight}>
            <DashboardRight userId={userId} />
            </div>
        </div>
    }
}

function DashboardCenter({ userId, userDatum, userDisplayName, workoutData }) {
    return <div className={styles.dashboardCenter}>

        <Recent userId={userId} userDatum={userDatum} userDisplayName={userDisplayName} workoutData={workoutData} />
        <Feed />
    </div>
}

function Recent({ userId, userDatum, userDisplayName, workoutData }) {
    console.log(userDatum)
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
            {userDatum['recent_workouts'].map(function (item) { //TODO make this work ahahahahieurwh
                return <li className={styles.listItem} key={item}>
                    <WorkoutCard
                        workoutId={item}
                        displayName={userDisplayName}
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


export default Dashboard;