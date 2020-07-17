import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/dashboard/sidebar.js';
import Dashboard from '../components/dashboard/dashboard.js';
import { userData, workoutData, exerciseData, groupData, USERID } from '../database/database.js';
import styles from './page.module.css';

import withAuth from '../helpers/withAuth.js';

class Home extends React.Component {

    render() {
        return <div className={styles.pageWrapper}>
            <Header current={'dashboard'} />
            <div className={styles.pageContent}>
                <Sidebar imageSrc={userData[USERID]['picture']} title={userData[USERID]['name']}
                    workoutTime={userData[USERID]['time_spent']} calories={userData[USERID]['calories']}
                    numWorkouts={userData[USERID]['completed_workouts']} />
                <Dashboard userId={USERID} />
            </div>
        </div>
    }
}

export default withAuth(Home)