import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../cards/group-card.module.css';
import groupData from '../../database/database.js';

// component displaying a Group card 
class GroupCard extends React.Component {

    groupID = this.props.groupID;
    render() {
        return <div className={styles.container}>
            <img className={styles.groupImg} src={groupData[this.props.groupID][image]} />
            <h1 className={styles.groupName}>{groupData[this.props.groupID][name]}</h1>

                <div className={styles.infoContainer}>
                <p className={styles.infoParagraph}>{groupData[this.props.groupID][description]}</p>
                    <p className={styles.infoParagraph}>Members: {groupData[this.props.groupID][members].length + groupData[groupID][admins].length}</p>
                    <p className={styles.infoParagraph}>Level: Beginner</p>
                </div>
        </div>
    }
}
export default GroupCard