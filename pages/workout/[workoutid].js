import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import styles from '../../pages/page.module.css';
import React from 'react';
import {workoutData} from '../../database/database.js';

import ExerciseCard from '../../components/cards/exercise-card.js';


        // TEMP: need to figure out dynamic routes getting query string
        const workoutID = 'wk1';

const exerciseIDArr = workoutData[workoutID].exercises.exerciseId;
const timeArr = workoutData[workoutID].exercises.time;
class WorkoutVideo extends React.Component{

    constructor(props)
    {
        super(props);

        let today = new Date();
        today.setSeconds(today.getSeconds() + timeArr[0]);
        // set the state
        this.state = { curIndex: 0, timeToStop: today };
        
        this.checkState = this.checkState.bind(this);
       setInterval(this.checkState, 1000); // check state every second
    }

    checkState() {
        if (this.state.curIndex + 1 < exerciseIDArr.length) {
            // if the exercise has ended
            if (Date.now() >= this.state.timeToStop) {
                // update with new exercise and new timetostop
                let newTimeToStop = this.state.timeToStop;
                newTimeToStop.setSeconds(this.state.timeToStop.getSeconds() + timeArr[this.state.curIndex + 1]);
                this.setState({ curIndex: this.state.curIndex + 1, timeToStop: newTimeToStop });
            }
        }
    }

/*
    let videoArr = [];
    for (let setNum of workoutData[workoutID].sets) {
        for (let exerciseID of workoutData[workoutID].exercises.exerciseID) {
            videoArr.push(<ExerciseCard type='exercise' exerciseID={exerciseID}></ExerciseCard>)
        }
    }
*/

render() {
    return <div>
        <Header />
        <div className={styles.workoutvidContainer}>
            <div id='current-exercise-container' className={styles.videoStatusBar}>
                <CurrentExerciseCard exerciseID={exerciseIDArr[this.state.curIndex]} time={timeArr[this.state.curIndex]}></CurrentExerciseCard>
            </div>
            <div className={styles.videoCurrentExercise}>
                
                            </div>
        </div>
    </div>
}
}

//<CurrentExerciseCard time=50sec
class CurrentExerciseCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Current exercise card {this.props.exerciseID} and {this.props.time}</h1>
            </div>
        );
    }
}

export default WorkoutVideo
