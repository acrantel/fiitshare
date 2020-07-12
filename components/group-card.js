import React, { Component } from 'react';
import Link from 'next/link'
import styles from '../components/group-card.module.css';
import database from '../database/database.js';

// component displaying a Group card 
class Group extends React.Component {

    groupID = this.props.groupID;
    render() {
        return <div>
            <img className={styles.groupImg} src={database.groups[groupID][groupImg]} />
            <h1 className={styles.groupName}/>

                <div className={styles.infoContainer}>
                    <p className={styles.infoParagraph}>Level {database.groups[groupID][level]}</p>
                    <p className={styles.infoParagraph}>Level {database.groups[groupID][level]}</p>
                    <p className={styles.infoParagraph}>Level {database.groups[groupID][level]}</p>
                </div>
        </div>
    }
}
export default Group