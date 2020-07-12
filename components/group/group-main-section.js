import React, { Component } from 'react';
import styles from './group-main-section.module.css';
import Tabs from '../tabs.js';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import WorkoutCard from '../cards/workout-card';
import {FaCrown} from 'react-icons/fa';

export default class GroupMainSection extends React.Component {
    render() {
        let group =groupData[this.props.groupID];
        return <div className={styles.mainSection}>
            <Tabs>
                <div label="Schedule">
                    <GroupSchedule groupSchedule={group['schedule']} />
                </div>
                <div label="Members">
                    <GroupMembers members={group['members']} admins={group['admins']}/>
                </div>
            </Tabs>
        </div>
    }
}

function GroupSchedule({ groupSchedule }) {
    return <div>
        {groupSchedule.map(function (item) {
            return <WorkoutCard workoutId={item['workoutId']}
                workoutDatum={workoutData[item['workoutId']]}
                dueBy={item['dueBy']} />
        })}
    </div>
}

function GroupMembers({ members, admins }) {
    return <div>
        {members.map(function (userId) {
            return <UserCard userId={userId} admin={admins.includes(userId)} />
        })}
    </div>
}

function UserCard({ userId, admin }) {
    const userDatum = userData[userId]
    return <div className={styles.userCard}>
        <img className={styles.userImage} src={userDatum['picture']} alt={userDatum['name']} />
        <h3 className={styles.userCardName}>
            <a href={`#TODO-user-${userId}`}>{userDatum['name']}</a>
        </h3>
        {
            admin ? <FaCrown className={styles.adminIcon}/> : <div/>
        }
    </div>
}