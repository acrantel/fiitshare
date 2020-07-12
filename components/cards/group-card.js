import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../cards/group-card.module.css';
import {groupData} from '../../database/database.js';

// component displaying a Group card 
class GroupCard extends React.Component {
    //groupID = this.props.groupID;
    render() {
        let groupID = this.props.groupID;
        return <div className={styles.container}>
            <img className={styles.groupImg} src={groupData[groupID].image} />
            <h2 className={styles.groupName}>{groupData[groupID].name}</h2>

                <div className={styles.infoContainer}>
                <p className={styles.infoParagraph}>{groupData[groupID].description}</p>
                    <p className={styles.infoParagraph}>
                        Members: {groupData[groupID].members.length + groupData[groupID].admins.length}</p>
                    <p className={styles.infoParagraph}>Level: Beginner</p>
                </div>
        </div>
    }
}
export default GroupCard