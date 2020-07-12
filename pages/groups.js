import React, { Component, Link } from 'react';
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import {userData} from '../database/database.js';
import { MdSearch } from 'react-icons/md'

const USERID = 'user1';
class Groups extends React.Component {
   
    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups))
        {
            myGroupsRender.push(<GroupCard groupID={userGroup} isYours={true} />);
        }
        return <div className='groups'>
            <Header />
            <div className='my-groups-container'>
                <h2 className='groups-title'>My Groups</h2>

                <div className='my-groups-list'>
                    {myGroupsRender}
                </div>
            </div>
            <div className='find-groups-container'>
                <h2 className='groups-title'>Find Groups</h2>
                <div className='find-groups-filter'>
                <MdSearch className='searchIcon'/>
            <input placeholder="Name" type="text"></input>
                </div>
            </div>
        </div>
        
    }
}
export default Groups
