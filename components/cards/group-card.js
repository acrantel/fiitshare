import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../cards/group-card.module.css';

// component displaying a Group card
class GroupCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { groupID, groupDatum } = this.props;
        const { image, name, description, memberCount, level } = groupDatum;
        return <Link href="/group/[groupid]" as={`/group/${groupID}`}>
            <div className={styles.container}>
                <img className={styles.groupImg} src={image} />
                <h2 className={styles.groupName}>
                    <Link href="/group/[groupid]" as={`/group/${groupID}`}>
                        <a className={styles.groupNameLink}>{name}</a>
                    </Link>
                </h2>

                <div className={styles.infoContainer}>
                    <p className={styles.infoParagraph}>{description}</p>
                    <div className={styles.infoWrapper}>
                        <div className={styles.infoEntry}>
                            <h3 className={styles.infoTitle}>Members</h3>
                            <div className={styles.infoValue}>{memberCount}</div>
                        </div>
                        <div className={styles.infoEntry}>
                            <h3 className={styles.infoTitle}>Level</h3>
                            <div className={styles.infoValue}>{level}</div>
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