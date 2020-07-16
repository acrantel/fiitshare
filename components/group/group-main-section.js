import React, { Component } from 'react';
import styles from './group-main-section.module.css';
import Tabs from '../tabs.js';
import { userData, workoutData, exerciseData, groupData } from '../../database/database.js';
import WorkoutCard from '../cards/workout-card';
import {FaCrown} from 'react-icons/fa';
import Link from 'next/link';

export default class GroupMainSection extends React.Component {
    render() {
        return <div className={styles.mainSection}>
            <Tabs>
                <div label="Schedule">
                    <GroupSchedule groupSchedule={this.props.groupDatum['schedule']} />
                </div>
                <div label="Members">
                    <GroupMembers members={this.props.groupDatum['members']} admins={this.props.groupDatum['admins']}/>
                </div>
            </Tabs>
        </div>
    }
}

function GroupSchedule({ groupSchedule }) {
    return <div className={styles.groupSchedule}>
        {groupSchedule.map(function (item, index) {
            return <WorkoutCard
                key={index}
                workoutId={item['workoutId']}
                displayName={userData[workoutData[item['workoutId']].creator].name}
                workoutDatum={workoutData[item['workoutId']]}
                dueBy={item['dueBy']}
            />
        })}
    </div>
}

function GroupMembers({ members, admins }) {
    return <div>
        {members.map(function (userId) {
            return <UserCard key={userId} userId={userId} admin={admins.includes(userId)} />
        })}
    </div>
}

function UserCard({ userId, admin }) {
    const userDatum = userData[userId]
    return <Link href='/user/[userid]' as={`/user/${userId}`}>
        <div className={styles.userCard}>
            <img className={styles.userImage} src={userDatum['picture']} alt={userDatum['name']} />
            <h3 className={styles.userCardName}>
                <Link href='/user/[userid]' as={`/user/${userId}`}>
                    <a>{userDatum['name']}</a>
                </Link>
            </h3>
            {
                admin ? <FaCrown className={styles.adminIcon}/> : <div/>
            }
    
        </div>
    </Link>
}