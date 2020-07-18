import React from 'react';
import { MdSkipPrevious, MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md';
import styles from './workout-video.module.css';
import CurrentExerciseCard from './current-exercise-card.js'

export default class WorkoutVideo extends React.Component {
    render() {
        const {
            exerciseData,
            exerciseID,
            time,
            paused,
            onPlayWorkout,
            onPauseWorkout,
            onSkipNextExercise
        } = this.props;
        return <div className={styles.workoutvidContainer}>
            <CurrentExerciseCard
                exerciseData={exerciseData}
                exerciseID={exerciseID}
                time={time}
            />
            <div className={styles.videoControls}>
                <MdSkipPrevious className={styles.videoControlsIcon}/>
                {paused ? <MdPlayArrow
                    onClick={onPlayWorkout}
                    className={styles.videoControlsIcon}
                /> : <MdPause
                    onClick={onPauseWorkout}
                    className={styles.videoControlsIcon}
                />}
                <MdSkipNext onClick={onSkipNextExercise} className={styles.videoControlsIcon}/>
            </div>
        </div>;
    }
}
