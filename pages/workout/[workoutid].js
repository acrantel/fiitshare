import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import styles from '../page.module.css';
import React from 'react';
import SetProgress from '../../components/workout-page/set-progress.js';
import WorkoutVideo from '../../components/workout-page/workout-video.js';
import ExerciseList from '../../components/workout-page/exercise-list.js';

//import ExerciseCard from '../../components/cards/exercise-card.js';
import { MdSkipPrevious, MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md'

class WorkoutPage extends React.Component {

    constructor(props) {
        super(props);

        this.skipNextExercise = this.skipNextExercise.bind(this);
        this.pauseWorkout = this.pauseWorkout.bind(this);
        this.playWorkout = this.playWorkout.bind(this);
        this.checkState = this.checkState.bind(this);

        const { sets, exercises = {} } = this.props.workoutDatum || {};
        const { exerciseId: exerciseIDArr = [], time: timeArr = [] } = exercises;
        let today = new Date();
        today.setSeconds(today.getSeconds() + timeArr[0]);
        // set the state
        this.state = {
            curIndex: 0,
            curSet: 1,
            timeToStop: today,
            paused: false,
            nowAndStopDiff: 0,
            exerciseIDArr,
            timeArr,
            numSets: sets
        };
        this.stateCheckerId = setInterval(this.checkState, 1000); // check state every second
    }
    
    componentWillUnmount() {
        clearInterval(this.stateCheckerId);
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
    skipNextExercise() {
        // check if it is the final exercise of the final set (workout is done)
        if ((this.state.curIndex + 1) >= this.state.exerciseIDArr.length && this.state.curSet >= this.state.numSets) {
            // do nothing, workout is done
        }
        else {
            // check if its the last exercise of a set & we should move onto the next set
            if ((this.state.curIndex + 1) >= this.state.exerciseIDArr.length) {
                let tempTime = new Date(this.state.timeToStop);
                tempTime.setSeconds(tempTime.getSeconds() + this.state.timeArr[0]);
                this.setState({ curIndex: 0, curSet: this.state.curSet + 1, timeToStop: tempTime });
            }
            else { // otherwise just increment the current index
                let tempTime = new Date(this.state.timeToStop);
                tempTime.setSeconds(tempTime.getSeconds() + this.state.timeArr[this.state.curIndex + 1]);
                this.setState({ curIndex: this.state.curIndex + 1, timeToStop: tempTime });
            }
        }
    }

    // when user clicks the pause button
    pauseWorkout() {
        // record the difference (in seconds) between 'now' and timetostop
        this.setState({ paused: true, nowAndStopDiff: this.state.timeToStop.getSeconds() - new Date().getSeconds() });
    }

    // when use clicks the play button
    playWorkout() {
        // use the previously recorded difference to update the new timetostop
        let tempTime = new Date();
        tempTime.setSeconds(tempTime.getSeconds() + this.state.nowAndStopDiff);
        this.setState({ paused: false, timeToStop: tempTime, nowAndStopDiff: 0 });

        // timeToStop needs to be updated to the
    }

    render() {
        const {
            name = 'Unknown workout'
        } = this.props.workoutDatum || {}
        return <div className={styles.contentWrapper}>
            <h1 className={styles.workoutName}>{name}</h1>
            <SetProgress set={this.state.curSet} sets={this.state.exerciseIDArr.length} />
            <div className={styles.workoutWrapper}>
                <ExerciseList
                    exerciseIds={this.state.exerciseIDArr}
                    times={this.state.timeArr}
                    current={this.state.curIndex}
                />
                <WorkoutVideo
                    exerciseID={this.state.exerciseIDArr[this.state.curIndex]}
                    time={this.state.timeArr[this.state.curIndex]}
                    paused={this.state.paused}
                    onPlayWorkout={this.playWorkout}
                    onPauseWorkout={this.pauseWorkout}
                    onSkipNextExercise={this.skipNextExercise}
                />
            </div>
        </div>;
    }
}

function Workout({ workoutid, workoutDatum }) {
    return <div className={styles.pageWrapper}>
        <Header current={'workouts'} />
        <div className={styles.pageContent}>
            <WorkoutPage workoutId={workoutid} workoutDatum={workoutDatum}/>
        </div>
    </div>;
}

Workout.getInitialProps = async ({ query }) => {
    const { workoutid } = query;
    const workoutDatum = await fetch(`http://localhost:3000/api/workout/${workoutid}`, {
        method: 'GET'
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))

    return { workoutid, workoutDatum };
};


export default Workout;
