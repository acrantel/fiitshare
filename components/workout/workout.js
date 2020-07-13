import React, { Component } from 'react';
import styles from './workout.module.css';
import { formatDate, formatTime } from '../../utils/datetime.js';
import { MdCheckCircle } from 'react-icons/md';

export default class Workout extends React.Component {
    render() {
        const {
            workoutId,
            workoutDatum: {
                name = 'Unknown Workout',
                exercises: {
                    time = []
                } = {}
            } = {},
            completed
        } = this.props;
        const date = new Date(...time);
        return <div className={`${styles.workout} ${completed ? styles.completed : ''}`}>
            <div className={styles.datetime}>
                {formatDate(date)}
                <div className={styles.time}>
                    {formatTime(date)}
                </div>
            </div>
            <div className={styles.label}>
                {'Complete "'}
                <a href={`#TODO-workout-${workoutId}`}>{name}</a>
                {'"'}
            </div>
            <div className={styles.icon}>
                {completed ? <MdCheckCircle /> : <div className={styles.circle} />}
            </div>
        </div>;
    }
}