import React, { Component, Link } from 'react';
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import {userData} from '../database/database.js';
import { MdSearch } from 'react-icons/md'

import styles from './page.module.css';


const USERID = 'user1';
class Groups extends React.Component {

    searchGroups()
    {

    }
    
    // onchange handler for the group name search text field
    nameChangeHandler = (event) => {
        this.setState({ nameSearch: event.target.value });
    }

    // onchange handler for the group name search text field
    levelChangeHandler = (event) => {
        this.setState({ nameSearch: event.target.value });
    }

    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups))
        {
            myGroupsRender.push(<GroupCard groupID={userGroup} isYours={true} />);
        }

        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{flexDirection: 'column'}}>
                <h2>My Groups</h2>
    
                <div className={styles.myGroupsContainer}>
                    {myGroupsRender}
                </div>
            </div>
            <div>
            <h2 className='groups-title'>Find Groups</h2>
                <div className='find-groups-line-2'>
                    <div className='find-groups-filter'>
                        <input onChange={this.nameChangeHandler} placeholder="Name" type="text"></input>
                        <select>
                            <option selected value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <button><MdSearch className='searchIcon' /></button>
                    </div>
                    <button className='join-group-id-button'>Join by ID</button>
                </div>
                </div>
        </div>
    }
}
export default Groups
