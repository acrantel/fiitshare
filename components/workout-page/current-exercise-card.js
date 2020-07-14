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
                    <h2>Work</h2>
                    <h2>{this.props.time} seconds</h2>
                    <h2>{exerciseData[this.props.exerciseID].name}</h2>
                </div>
        );
    }
}
