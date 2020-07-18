import React from 'react';
import styles from './exercise-list.module.css';

export default class ExerciseList extends React.Component {
    render() {
        const {
            exerciseData,
            exerciseIds,
            times,
            current
        } = this.props;
        return <ul className={styles.list}>
            {exerciseIds.map((exerciseId, i) => {
                const time = times[i];
                return <li
                    key={i.toString()}
                    className={`${styles.exercise} ${current === i ? styles.current : ''}`}
                >
                    <span className={styles.name}>{(exerciseData[exerciseId] || {}).name}</span>
                    <span className={styles.time}>{time} sec</span>
                </li>
            })}
        </ul>;
    }
}
