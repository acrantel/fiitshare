import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import Tabs from '../components/tabs.js';
import SearchBar from '../components/search-bar.js';
import { userData, workoutData, USERID } from '../database/database.js';
import Workout from '../components/workout/workout.js';

class Workouts extends React.Component {
    render() {
        // TODO: Get from prop or something later
        const userId = USERID;
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={`${styles.pageContent} ${styles.workoutContainer}`}>
                <div className={styles.headingWrapper}>
                    <h1 className={styles.heading}>Workouts</h1>
                    <button>Create a workout</button>
                </div>
                <div className={styles.content}>
                    <Tabs>
                        <div label="Scheduled Workouts">
                            {userData[userId].workouts.map(workoutId => (
                                <Workout
                                    key={workoutId}
                                    workoutId={workoutId}
                                    workoutDatum={workoutData[workoutId]}
                                    completed={/* TEMP */ workoutId === 'wk2'}
                                />
                            ))}
                        </div>
                        <div label="My Library">
                            {/* TODO */}
                        </div>
                        <SearchBar />
                    </Tabs>
                </div>
            </div>
        </div>;
    }
}
export default Workouts
