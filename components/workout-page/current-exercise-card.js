import React from 'react';
import styles from './current-exercise-card.module.css';

export default class CurrentExerciseCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { exerciseData } = this.props;
        const {
            video_link,
            name = 'Unknown exercise'
        } = exerciseData[this.props.exerciseID] || {}
        return (
            <div className={styles.videoCurrentExercise}>
                <img src={video_link} className={styles.video} />
                <p className={styles.exercise}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.timeWrapper}>
                        <span className={styles.time}>{this.props.time}s</span>
                    </span>
                </p>
            </div>
        );
    }
}
