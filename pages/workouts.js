import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import Tabs from '../components/tabs.js';
import SearchBar from '../components/search-bar.js';
import Workout from '../components/workout/workout.js';
import WorkoutCard from '../components/cards/workout-card.js'
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';
import { getUserWorkouts, getUserScheduledWorkouts } from '../utils/api.js';

class ScheduledWorkouts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduledWorkouts: []
        };
    }
    
    async componentDidMount() {
        const scheduledWorkouts = await getUserScheduledWorkouts(this.props.userId);
        this.setState({ scheduledWorkouts });
    }
    
    render() {
        return this.state.scheduledWorkouts.sort((a, b) => {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.dueBy) - new Date(a.dueBy);
        }).map(({
            workoutId,
            workoutName,
            groupImage,
            dueBy,
            completed
        }) => <Workout
            key={workoutId}
            groupImg={groupImage}
            workoutId={workoutId}
            workoutName={workoutName}
            dueDate={new Date(dueBy)}
            completed={completed}
        />);
    }
}

class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            authorName: ''
        };
    }
    
    async componentDidMount() {
        const { workouts, name } = await getUserWorkouts(this.props.userId);
        this.setState({
            workouts,
            authorName: name
        });
    }
    
    render() {
        return <div className={styles.myWorkoutsLibrary}>
            {this.state.workouts.map(({ id: workoutId, ...workoutDatum }) => (
                <WorkoutCard
                    key={workoutId}
                    workoutId={workoutId}
                    displayName={this.state.authorName}
                    workoutDatum={workoutDatum}
                />
            ))}
        </div>;
    }
}

class Workouts extends React.Component {
    render() {
        const { userId, userDatum } = this.props;
        return <div className={styles.pageWrapper}>
            <Header current={'workouts'} userId={userId} userDatum={userDatum} />
            <div className={`${styles.pageContent} ${styles.workoutContainer}`}>
                <div className={styles.headingWrapper}>
                    <h1 className={styles.heading}>Workouts</h1>
                    <Link href='/create-workout'>
                        <a className={['button', styles.createButtonContent].join(' ')}>
                            <div className={styles.createButtonIcon}>
                                <MdAddCircleOutline /></div>
                            <div className={styles.createButtonText}>Create a new workout</div>
                        </a>
                    </Link>

                </div>
                <div className={[styles.workoutsTitle, styles.content].join(' ')}>
                    <Tabs>
                        <div label="Scheduled Workouts">
                            <ScheduledWorkouts userId={userId} />
                        </div>
                        <div label="My Library">
                            <MyLibrary userId={userId} />
                        </div>
                    <SearchBar />
                    </Tabs>
                </div>
            </div>
        </div>;
    }
}
export default Workouts
