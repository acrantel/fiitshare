import React, { Component, Link } from 'react';
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import {userData} from '../database/database.js';
import styles from './page.module.css';


const USERID = 'user1';
class Groups extends React.Component {
   
    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups))
        {
            myGroupsRender.push(<GroupCard groupID={userGroup} />);
        }
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{flexDirection: 'column'}}>
                <h2>My Groups</h2>
    
                <div className='my-groups-container'>
                    {myGroupsRender}
                </div>
            </div>
        </div>
        
    }
}
export default Groups
