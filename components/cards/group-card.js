import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../cards/group-card.module.css';
import {groupData} from '../../database/database.js';

// component displaying a Group card 
class GroupCard extends React.Component {
    constructor(props){
        super(props);
    }

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
                <JoinButton isYours={this.props.isYours} groupID={groupID} />
                </div>
        </div>
    }
}


function JoinButton(props)
{
    // if this is part of  "Your Groups"
    if (props.isYours)
    {
        // no button will be displayed
        return null;
    }
    // otherwise display a Join Button
    return <button className={styles.joinButton} onClick={joinOnClick(props.groupID)}>Join</button>;
}

function joinOnClick(groupID)
{
    // add new values into database
    
}


export default GroupCard