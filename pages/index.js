import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/dashboard/sidebar.js';
import Dashboard from '../components/dashboard/dashboard.js';
import styles from './page.module.css';

import {auth} from '../database/firestore.js';
import {getUser} from '../utils/api.js';
import SignIn from './signin.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'LOADING',
            userId: '',
            userDisplayName: '',
            userDatum: {}
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged(async authUser => {
            if (authUser) {
                const userDatum = await getUser(authUser.uid);
                this.setState({
                    status: 'SIGNED_IN',
                    userId: authUser.uid,
                    userDisplayName: authUser.displayName,
                    userDatum: userDatum
                })
                if (authUser.metadata.creationTime === authUser.metadata.lastSignInTime) {
                    let userid = authUser.uid;
                    const data = {
                        workouts: [],
                        recent_workouts: [],
                        completed_workouts: 0,
                        groups: [],
                        name: authUser.displayName,
                        profile_picture: authUser.photoURL,
                        cover_picture: "",
                        calories: 0,
                        time_spent: 0,
                        this_week: {}
                    };

                    fetch(`http://localhost:3000/api/user/${userid}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                }
            } else {
                this.setState({ status: 'LOADING' });
            }
        });
    }

    render() {
        const {
            status,
            userId,
            userDisplayName,
            userDatum
        } = this.state

        if (status === 'LOADING') {
            return <SignIn />
        } else if (status === 'SIGNED_IN') {
            return <div className={styles.pageWrapper}>
                <Header current={'dashboard'} userId={userId} userDatum={userDatum} />
                <div className={styles.pageContent}>
                    <Sidebar imageSrc={userDatum['profile_picture']} title={userDatum['name']}
                        workoutTime={userDatum['time_spent']} calories={userDatum['calories']}
                        numWorkouts={userDatum['completed_workouts']} />
                    <Dashboard userId={userId} userDatum={userDatum} userDisplayName={userDisplayName} />
                </div>
            </div>
        }
    }
}

export default Home