import React, { Component } from 'react';
import styles from './workout.module.css';
import { formatDate, formatTime } from '../../utils/datetime.js';
import { MdCheckCircle } from 'react-icons/md';
import Link from 'next/link';
import {timeFormatter} from '../user/user-chart.js';

export default class Workout extends React.Component {
    

    render() {
        const {
            groupId,
            groupImg,
            workoutId,
            workoutDatum: {
                name = 'Unknown Workout',
            } = {},
            dueDate,
            completed,
        } = this.props;
        return <Link href='/workout/[workoutid]' as={`/workout/${workoutId}`}>
            <div className={`${styles.workout} ${completed ? styles.completed : ''}`}>
                <div className={styles.groupImgContainer}>
                    <img className={styles.groupImg} src={groupImg}></img>
                </div>
                <DateCard dateArr={dueDate}/>
                <div className={styles.label}>
                    <Link href='/workout/[workoutid]' as={`/workout/${workoutId}`}>
                        <a>
                    {'Complete '}
                    <div style={{fontWeight: 'bold'}}>{name}</div></a>
                    </Link>
                    
                </div>
                <div className={styles.icon}>
                    {completed ? <MdCheckCircle /> : <div className={styles.circle} />}
                </div>
            </div>
        </Link>;
    }
}


// [Year, Month, Day, Hour, Min]
class DateCard extends React.Component
{
    constructor(props) {
        super(props);
        this.monthToStr = this.monthToStr.bind(this);
        this.getDayOfWeek = this.getDayOfWeek.bind(this);
        this.getTimeStr = this.getTimeStr.bind(this);

    }
    monthToStr(month) {
        switch(month) {
            case 0: return 'Jan';
            case 1: return 'Feb';
            case 2: return 'Mar';
            case 3: return 'Apr';
            case 4: return 'May';
            case 5: return 'Jun';
            case 6: return 'Jul';
            case 7: return 'Aug';
            case 8: return 'Sep';
            case 9: return 'Oct';
            case 10: return 'Nov';
            case 11: return 'Dec';
        }
    }
    getDayOfWeek(year, month, day) {
        var d = new Date(year, month, day, 1,1,1,1);
        switch(d.getDay())
        {
            case 0: return 'Sun';
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
            case 4: return 'Thu';
            case 5: return 'Fri';
            case 6: return 'Sat';
        }
    }

    getTimeStr(hour, min) {
        if (hour == 24 || (hour >= 1 && hour <= 11)) {
            // am
            return timeFormatter(hour, min) + " AM";
        }

        // pm
        // noon
        if (hour == 12) {
            return timeFormatter(12, min) + " PM";
        }
        // normal pm (13-23), subtract 12
        return timeFormatter(hour - 12, min) + " PM";
    }

    render() {
        const year = this.props.dateArr[0];
        const month = this.props.dateArr[1];
        const day = this.props.dateArr[2];
        const hour = this.props.dateArr[3];
        const min = this.props.dateArr[4];
    return <div className={styles.datetime}>
        {this.monthToStr(month)}{" "}{day}
        <div className={styles.time}>
            {this.getTimeStr(hour, min)}
        </div>
        <div className={styles.dayOfWeek}>
            {this.getDayOfWeek(year, month, day)}
        </div>
        </div>
    }
}


/*
<div className={styles.datetime}>
                {formatDate(dueDate)}
                <div className={styles.time}>
                    {formatTime(dueDate)}
                </div>
            </div>
            */