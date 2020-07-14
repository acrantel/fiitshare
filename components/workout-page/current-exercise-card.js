import React from 'react';
import styles from './current-exercise-card.module.css';
import {exerciseData} from '../../database/database.js';

export default class CurrentExerciseCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <div className={styles.videoCurrentExercise}>
                    <img
                        src={exerciseData[this.props.exerciseID].video_link}
                        className={styles.video}
                    />
                    <p className={styles.exercise}>
                        <span className={styles.name}>
                            {exerciseData[this.props.exerciseID].name}
                        </span>
                        <span className={styles.timeWrapper}>
                            <span className={styles.time}>{this.props.time}s</span>
                        </span>
                    </p>
                </div>
        );
    }
}
