import React, { Component } from 'react';
import Link from 'next/link'
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import {userData, groupData} from '../database/database.js';
import { MdSearch } from 'react-icons/md'

import styles from './page.module.css';


const USERID = 'user1';
class Groups extends React.Component {

    constructor(props)
    {
        super(props);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.levelChangeHandler =this.levelChangeHandler.bind(this);
        this.searchGroups = this.searchGroups.bind(this);

        // get only the search results that the user is not in
        let searchResults = [];
        for (let curGroupID of Object.keys(groupData))
        {
            if (!(userData[USERID].groups).includes(curGroupID))
            {
                searchResults.push(curGroupID);
            } 
        }
        // initial 'search results' (display any group that does not contain user)
        this.state = {searchResults: searchResults, nameSearch: '', levelSearch: 0};
    }
    
    searchGroups()
    {
        // clear out array
        this.setState({searchResults: []});
        let results = [];
        // uses state variables nameSearch and levelSearch
        for (let curGroupID of Object.keys(groupData)) { 
                // add to results if matching and user is not in the group already
                if (
    ((this.state.nameSearch && ((groupData[curGroupID].name).toLowerCase()).includes(this.state.nameSearch.toLowerCase())) || !this.state.nameSearch)
                && 
    ((this.state.levelSearch && (groupData[curGroupID].level).toLowerCase() == (this.state.levelSearch).toLowerCase()) || !this.state.levelSearch)
                && !(userData[USERID].groups).includes(curGroupID)) {
                    results.push(curGroupID); // add the group id to search results
                }
            }
        this.setState({searchResults: results});
    };
    
    // onchange handler for the group name search text field
    nameChangeHandler = (event) => { this.setState({ nameSearch: event.target.value })};

    // onchange handler for the group name search text field
    levelChangeHandler = (event) => { this.setState({ levelSearch: event.target.value })};

    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups))
        {
            myGroupsRender.push(<GroupCard groupID={userGroup} isYours={true} />);
        }

        var searchResultsRender = [];
        for (let groupID of (this.state.searchResults))
        {
            searchResultsRender.push(<GroupCard groupID={groupID} isYours={false}/>);
        }

        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{ flexDirection: 'column' }}>
                <div className={styles.myGroupsContainer}>
                    <h2>My Groups</h2>

                    <div className='my-groups-list'>{myGroupsRender}</div>
                </div>

                <div className='find-groups-container'>
                    <h2 className='groups-title'>Find Groups</h2>
                    <div className='find-groups-line-2'>
                        <div className='find-groups-filter'>
                            <input onChange={this.nameChangeHandler} placeholder="Name" type="text"></input>
                            <select onChange={this.levelChangeHandler}>
                                <option selected value={0}>None</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <button onClick={this.searchGroups}><MdSearch className='searchIcon' /></button>
                        </div>
                        <div className='join-group-id-button-container'>
                            <button className='join-group-id-button'>Join by ID</button>
                        </div>
                    </div>
                    <div className='find-groups-line-3'>
                        {searchResultsRender}
                    </div>

                </div>
            </div>
        </div>
    };
};
export default Groups;  
