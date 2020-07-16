import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../cards/group-card.module.css';
import { groupData } from '../../database/database.js';

// component displaying a Group card
class GroupCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let groupID = this.props.groupID;
        return <Link href="/group/[groupid]" as={`/group/${groupID}`}>
            <div className={styles.container}>
                <img className={styles.groupImg} src={groupData[groupID].image} />
                <h2 className={styles.groupName}>
                    <Link href="/group/[groupid]" as={`/group/${groupID}`}>
                        <a className={styles.groupNameLink}>{groupData[groupID].name}</a>
                    </Link>
                </h2>

                <div className={styles.infoContainer}>
                    <p className={styles.infoParagraph}>{groupData[groupID].description}</p>
                    <div className={styles.infoWrapper}>
                        <div className={styles.infoEntry}>
                            <h3 className={styles.infoTitle}>Members</h3>
                            <div className={styles.infoValue}>{groupData[groupID].members.length}</div>
                        </div>
                        <div className={styles.infoEntry}>
                            <h3 className={styles.infoTitle}>Level</h3>
                            <div className={styles.infoValue}>{groupData[groupID].level}</div>
                        </div>
                    </div>
                    <JoinButton isYours={this.props.isYours} groupID={groupID} />
                </div>
            </div>
        </Link>;
    }
}


function JoinButton(props) {
    // if this is part of  "Your Groups"
    if (props.isYours) {
        // no button will be displayed
        return null;
    }
    // otherwise display a Join Button
    return <button className={styles.joinButton} onClick={joinOnClick(props.groupID)}>Join</button>;
}

function joinOnClick(groupID) {
    // TODO add new values into database

}


export default GroupCard