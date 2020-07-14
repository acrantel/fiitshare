import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import styles from '../../pages/page.module.css';
import React from 'react';
import {workoutData, exerciseData} from '../../database/database.js';

import ExerciseCard from '../../components/cards/exercise-card.js';
import { MdSkipPrevious, MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md'

class WorkoutVideo extends React.Component {

    constructor(props) {
        super(props);

        this.skipNextExercise = this.skipNextExercise.bind(this);
        this.pauseWorkout = this.pauseWorkout.bind(this);
        this.playWorkout = this.playWorkout.bind(this);
        this.checkState = this.checkState.bind(this);

        const workoutID = props.workoutId;
        const timeArr = workoutData[workoutID].exercises.time;
        let today = new Date();
        today.setSeconds(today.getSeconds() + timeArr[0]);
        // set the state
        this.state = {
            curIndex: 0,
            curSet: 1,
            timeToStop: today,
            paused: false,
            nowAndStopDiff: 0,
            exerciseIDArr: workoutData[workoutID].exercises.exerciseId,
            timeArr,
            numSets: workoutData[workoutID].sets
        };
        setInterval(this.checkState, 1000); // check state every second
    }

    checkState() {
        //if (!(this.state.paused)) {
            if (this.state.curIndex + 1 < this.state.exerciseIDArr.length) {
                // if the exercise has ended
                if (new Date() >= this.state.timeToStop) {
                    // update with new exercise and new timetostop
                    let newTimeToStop = this.state.timeToStop;
                    newTimeToStop.setSeconds(this.state.timeToStop.getSeconds() + this.state.timeArr[this.state.curIndex + 1]);
                    this.setState({ curIndex: this.state.curIndex + 1, timeToStop: newTimeToStop });
                }
            }
            else // when the one exercise array has finished
            {
                // if there are still more sets to do
                if (this.state.curSet + 1 <= this.state.numSets) {
                    let newTimeToStop = this.state.timeToStop;
                    newTimeToStop.setSeconds(this.state.timeToStop.getSeconds() + this.state.timeArr[0]);
                    this.setState({ curIndex: 0, curSet: this.state.curSet + 1, timeToStop: newTimeToStop });
                }
            }
        //}
    }

    // skips the next exercise by incrementing the curIndex and curSet (if needed) & timetostop
    skipNextExercise()
    {
        // check if it is the final exercise of the final set (workout is done)
        if ((this.state.curIndex + 1) >= this.state.exerciseIDArr.length && this.state.curSet >= this.state.numSets)
        {
            // do nothing, workout is done
        }
        else {
            // check if its the last exercise of a set & we should move onto the next set
            if ((this.state.curIndex + 1) >= this.state.exerciseIDArr.length) {
                let tempTime = new Date(this.state.timeToStop);
                tempTime.setSeconds(tempTime.getSeconds() + this.state.timeArr[0]);
                this.setState({curIndex: 0, curSet: this.state.curSet + 1, timeToStop: tempTime});
            }
            else { // otherwise just increment the current index
                let tempTime = new Date(this.state.timeToStop);
                tempTime.setSeconds(tempTime.getSeconds() + this.state.timeArr[this.state.curIndex + 1]);
                this.setState({ curIndex: this.state.curIndex + 1, timeToStop: tempTime });
            }
        }
    }

    // when user clicks the pause button
    pauseWorkout()
    {
        // record the difference (in seconds) between 'now' and timetostop
        this.setState({paused: true, nowAndStopDiff: this.state.timeToStop.getSeconds() - new Date().getSeconds()});
    }

    // when use clicks the play button
    playWorkout()
    {
        // use the previously recorded difference to update the new timetostop
        let tempTime = new Date();
        tempTime.setSeconds(tempTime.getSeconds() + this.state.nowAndStopDiff);
        this.setState({paused: false, timeToStop: tempTime, nowAndStopDiff: 0});

        // timeToStop needs to be updated to the
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
        return <div className={styles.workoutvidContainer}>
            <div className={styles.videoStatusBar}>
                <h1>Set {this.state.curSet}</h1>
            </div>
            <CurrentExerciseCard exerciseID={this.state.exerciseIDArr[this.state.curIndex]} time={this.state.timeArr[this.state.curIndex]}></CurrentExerciseCard>
            <div className={styles.videoControls}>
                <MdSkipPrevious className={styles.videoControlsIcon}/>
                {this.state.paused && <MdPlayArrow onClick={this.playWorkout} className={styles.videoControlsIcon}/>}
                {!this.state.paused && <MdPause onClick={this.pauseWorkout} className={styles.videoControlsIcon}/>}
                <MdSkipNext onClick={this.skipNextExercise} className={styles.videoControlsIcon}/>
            </div>
        </div>;
    }
}

class CurrentExerciseCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <div className={styles.videoCurrentExercise}>
                    <h2>Work</h2>
                    <h2>{this.props.time} seconds</h2>
                    <h2>{exerciseData[this.props.exerciseID].name}</h2>
                </div>
        );
    }
}

function Workout({ workoutid }) {
    return <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.pageContent}>
            <WorkoutVideo workoutId={workoutid} />
        </div>
    </div>;
}

Workout.getInitialProps = async ({ query }) => {
    const { workoutid } = query;
    return { workoutid };
};
export default Workout
