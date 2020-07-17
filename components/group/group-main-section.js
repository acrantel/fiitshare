import React, { Component } from 'react';
import styles from './group-main-section.module.css';
import Tabs from '../tabs.js';
import WorkoutCard from '../cards/workout-card';
import {FaCrown} from 'react-icons/fa';
import Link from 'next/link';

export default class GroupMainSection extends React.Component {
    render() {
        return <div className={styles.mainSection}>
            <Tabs>
                <div label="Schedule">
                    <GroupSchedule groupSchedule={this.props.scheduledWorkouts} />
                </div>
                <div label="Members">
                    <GroupMembers members={this.props.users}/>
                </div>
            </Tabs>
        </div>
    }
}

// groupSchedule => scheduledWorkouts
function GroupSchedule({ groupSchedule = [] }) {
    return <div className={styles.groupSchedule}>
        {groupSchedule.map(function (item, index) {
            return <WorkoutCard
                key={index}
                workoutId={item['workoutId']}
                workoutDatum={item['workoutDatum']}
                dueBy={item['dueBy']}
            />
        })}
    </div>
}

function GroupMembers({ members }) {
    return <div>
        {members.map(function (userDatum) {
            return <UserCard key={userDatum['uid']} userDatum={userDatum} />
        })}
    </div>
}

<<<<<<< HEAD
function UserCard({ userDatum}) {
    return <Link href='/user/[userid]' as={`/user/${userDatum['uid']}`}>
        <div className={styles.userCard}>
            <img className={styles.userImage} src={userDatum['profile_picture']} alt={userDatum['name']} />
            <h3 className={styles.userCardName}>
                <Link href='/user/[userid]' as={`/user/${userDatum['uid']}`}>
=======
function UserCard({ userId, admin }) {
    const userDatum = userData[userId]
    return <Link href='/user/[userid]' as={`/user/${userId}`}>
        <div className={styles.userCard}>
            <img className={styles.userImage} src={userDatum['picture']} alt={userDatum['name']} />
            <h3 className={styles.userCardName}>
                <Link href='/user/[userid]' as={`/user/${userId}`}>
>>>>>>> master
                    <a>{userDatum['name']}</a>
                </Link>
            </h3>
            {
<<<<<<< HEAD
                userDatum['admin'] ? <FaCrown className={styles.adminIcon}/> : <div/>
=======
                admin ? <FaCrown className={styles.adminIcon}/> : <div/>
>>>>>>> master
            }
    
        </div>
    </Link>
}