import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/dashboard/sidebar.js';
import Dashboard from '../components/dashboard/dashboard.js';
import styles from './page.module.css';

class Home extends React.Component {
    render() {
        const {
            userId,
            userDatum
        } = this.props;

        return <div className={styles.pageWrapper}>
            <Header current={'dashboard'} userId={userId} userDatum={userDatum} />
            <div className={styles.pageContent}>
                <Sidebar imageSrc={userDatum['profile_picture']} title={userDatum['name']}
                    workoutTime={userDatum['time_spent']} calories={userDatum['calories']}
                    numWorkouts={userDatum['completed_workouts']} />
                <Dashboard userId={userId} userDatum={userDatum} userDisplayName={userDatum['name']} />
            </div>
        </div>;
    }
}

export default Home
