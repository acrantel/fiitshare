import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import styles from '../page.module.css';
import React from 'react';
import SetProgress from '../../components/workout-page/set-progress.js';
import WorkoutVideo from '../../components/workout-page/workout-video.js';
import ExerciseList from '../../components/workout-page/exercise-list.js';
import ErrorPage from '../../components/error.js';
import { getWorkout } from '../../utils/api.js';

//import ExerciseCard from '../../components/cards/exercise-card.js';
import { MdSkipPrevious, MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md'

function secondsToMs(seconds) {
    return seconds * 1000;
}

function msToSeconds(ms) {
    return Math.ceil(ms / 1000);
}

class WorkoutPage extends React.Component {

    constructor(props) {
        super(props);

        this.startWorkout = this.startWorkout.bind(this);
        this.pauseWorkout = this.pauseWorkout.bind(this);
        this.playWorkout = this.playWorkout.bind(this);
        this.nextExercise = this.nextExercise.bind(this);
        this.checkState = this.checkState.bind(this);

        const { sets, exercises = {} } = this.props.workoutDatum || {};
        const { exerciseId: exerciseIdArr = [], time: timeArr = [] } = exercises;

        // set the state
        this.state = {
            started: false,
            compeleted: false,
            exerciseIndex: 0,
            currentSet: 0,
            exerciseEndTime: Date.now(), // ms
            paused: true,
            exerciseTimeLeft: 0, // ms
            exerciseIds: exerciseIdArr,
            timeArr: timeArr, // seconds
            numSets: sets
        };
        this.stateCheckerId = setInterval(this.checkState, 1000); // check state every second
    }

    componentWillUnmount() {
        clearInterval(this.stateCheckerId);
    }

    checkState() {
        if (!this.state.started || this.state.completed) {
            return;
        }
        if (!(this.state.paused)) {
            const { exerciseEndTime } = this.state;
            let now = Date.now();
            this.setState({
                exerciseTimeLeft: exerciseEndTime - now,
            })
            if (now > exerciseEndTime) {
                // next exercise
                this.nextExercise();
            }
        }
    }

    startWorkout() {
        const { timeArr } = this.state;
        const now = Date.now();
        this.setState({
            started: true,
            exerciseEndTime: now + secondsToMs(timeArr[0]),
            paused: false,
            exerciseTimeLeft: secondsToMs(timeArr[0]),
        })
    }

    nextExercise() {
        const { exerciseIds, currentSet, exerciseIndex, numSets, timeArr } = this.state;
        this.setState({ paused: false });
        let now = Date.now();
        if (exerciseIndex + 1 >= exerciseIds.length && currentSet + 1 >= numSets) {
            // workout done
            this.setState({ completed: true });
        }
        else if (exerciseIndex + 1 >= exerciseIds.length) {
            this.setState({
                exerciseIndex: 0,
                currentSet: currentSet + 1,
                exerciseEndTime: now + secondsToMs(timeArr[0])
            });
        }
        else {
            let newIndex = exerciseIndex + 1;
            this.setState({
                exerciseIndex: newIndex,
                exerciseEndTime: now + secondsToMs(timeArr[newIndex])
            });
        }

    }

    // when user clicks the pause button
    pauseWorkout() {
        // record the difference (in ms) between 'now' and timetostop
        this.setState({ paused: true, nowAndStopDiff: this.state.exerciseEndTime - Date.now() });
    }

    // when use clicks the play button, unpausing workout
    playWorkout() {
        // use the previously recorded difference to update the new timetostop
        let endTime = Date.now() + this.state.exerciseTimeLeft;
        this.setState({
            paused: false,
            exerciseEndTime: endTime
        });
    }

    render() {
        const {
            name = 'Unknown workout'
        } = this.props.workoutDatum || {}

        let workoutCenter;
        if (this.state.completed) {
            workoutCenter = <div className={styles.startWorkoutWrapper}>
                <span className={styles.startWorkoutSpan}>Workout complete!</span>
            </div>;
        } else if (!this.state.started) {
            workoutCenter = <div className={styles.startWorkoutWrapper}>
                <span className={styles.startWorkoutSpan} onClick={this.startWorkout}>Click to start workout</span>
            </div>;
        } else {
            workoutCenter = <WorkoutVideo
                exerciseID={this.state.exerciseIds[this.state.exerciseIndex]}
                time={msToSeconds(this.state.exerciseTimeLeft)}
                paused={this.state.paused}
                onPlayWorkout={this.playWorkout}
                onPauseWorkout={this.pauseWorkout}
                onSkipNextExercise={this.nextExercise} />;
        }

        return <div className={styles.contentWrapper}>
            <h1 className={styles.workoutName}>{name}</h1>
            <SetProgress set={this.state.currentSet + 1} sets={this.state.numSets} />
            <div className={styles.workoutWrapper}>
                <ExerciseList
                    exerciseIds={this.state.exerciseIds}
                    times={this.state.timeArr}
                    current={this.state.exerciseIndex}
                />
                {
                    workoutCenter
                }
            </div>
        </div>;

    }
}

function Workout({ error, workoutid, workoutDatum }) {
    return <div className={styles.pageWrapper}>
        <Header current={'workouts'} />
        <div className={styles.pageContent}>
            {error
                ? <ErrorPage error={error} />
                : <WorkoutPage workoutId={workoutid} workoutDatum={workoutDatum} />}
        </div>
    </div>;
}

Workout.getInitialProps = async ({ query }) => {
    const { workoutid } = query;
    try {
        const workoutDatum = await getWorkout(workoutid);
        return { workoutid, workoutDatum };
    } catch ({ message: error }) {
        return { error };
    }
};


export default Workout;
