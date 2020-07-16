import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import Tabs from '../components/tabs.js';
import SearchBar from '../components/search-bar.js';
import { userData, workoutData, groupData, USERID } from '../database/database.js';
import Workout from '../components/workout/workout.js';
import WorkoutCard from '../components/cards/workout-card.js'
import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

function ScheduledWorkouts({ userId }) {
    // get the scheduled workouts for all the groups the user is in
    let result = [];
    for (let groupId of userData[userId].groups) {
        for (let scheduledWorkout of groupData[groupId].schedule) {
            /*
            result.push({
                groupId: groupId,
                workoutId: scheduledWorkout[workoutId],
                workoutDatum: workoutData[scheduledWorkout[workoutId]],
                dueDate: scheduledWorkout[dueBy],
                completed: (workoutId === 'wk2'),
            });
            */

            let workoutId = scheduledWorkout.workoutId;

            result.push(<Workout
                groupId={groupId}
                groupImg={groupData[groupId].image}
                workoutId={workoutId}
                workoutDatum={workoutData[workoutId]}
                dueDate={scheduledWorkout.dueBy}
                completed=/*temp*/{workoutId === 'wk2'} />);
        }
        
        result.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.props.dueDate) - new Date(a.dueDate);
          });
    }
    return result;
    userData[userId].workouts.map(workoutId => (
        <Workout
            key={workoutId}
            workoutId={workoutId}
            groupId={groupId}
            workoutDatum={workoutData[workoutId]}
            completed={/* TEMP */ workoutId === 'wk2'}
        />
    ));
}


function MyLibrary ({ userId }) {
    return <div className={styles.myWorkoutsLibrary}>
        {userData[userId].workouts.map(workoutId => (
            <WorkoutCard
                key={workoutId}
                workoutId={workoutId}
                displayName={userData[userId].name}
                workoutDatum={workoutData[workoutId]}
            />
        ))}
    </div>;
}

class Workouts extends React.Component {
    render() {
        // TODO: Get from prop or something later
        const userId = USERID;
        return <div className={styles.pageWrapper}>
            <Header current={'workouts'} />
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
                <div className={styles.content}>
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
