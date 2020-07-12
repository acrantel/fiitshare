import React, { Component } from 'react';
import Link from 'next/link'
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import {userData} from '../database/database.js';


const USERID = 'user1';
class Groups extends React.Component {
   
    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups))
        {
            myGroupsRender.push(<GroupCard groupID={userGroup} />);
        }
        return <div>
            <Header />
            <h2>My Groups</h2>

            <div className='my-groups-container'>
                {myGroupsRender}
            </div>
        </div>
        
    }
}
export default Groups
