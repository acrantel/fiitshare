import React, { Component } from 'react';
import Link from 'next/link'
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import { userData, groupData, USERID } from '../database/database.js';
import { MdSearch } from 'react-icons/md'

import styles from './page.module.css';
import SearchBar from '../components/search-bar.js';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.levelChangeHandler = this.levelChangeHandler.bind(this);
        this.searchGroups = this.searchGroups.bind(this);

        // get only the search results that the user is not in
        let searchResults = [];
        for (let curGroupID of Object.keys(groupData)) {
            if (!(userData[USERID].groups).includes(curGroupID)) {
                searchResults.push(curGroupID);
            }
        }
        // initial 'search results' (display any group that does not contain user)
        this.state = { searchResults: searchResults, nameSearch: '', levelSearch: 0 };
    }

    searchGroups() {
        // clear out array
        this.setState({ searchResults: [] });
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
        this.setState({ searchResults: results });
    };

    // onchange handler for the group name search text field
    nameChangeHandler = (event) => { this.setState({ nameSearch: event.target.value }) };

    // onchange handler for the group name search text field
    levelChangeHandler = (event) => { this.setState({ levelSearch: event.target.value }) };

    render() {
        var myGroupsRender = [];
        // for each of the user's groups
        for (let userGroup of (userData[USERID].groups)) {
            myGroupsRender.push(<GroupCard key={userGroup} groupID={userGroup} isYours={true} />);
        }

        var searchResultsRender = [];
        for (let groupID of (this.state.searchResults)) {
            searchResultsRender.push(<GroupCard key={groupID} groupID={groupID} isYours={false} />);
        }

        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{ flexDirection: 'column' }}>
                <div className={styles.myGroupsContainer}>
                    <div className={styles.groupSection}>
                        <h1 className='section-title'><span>My Groups</span></h1>
                        <div >
                            <Link href="/create-group">
                                <a className='button'>Create a Group</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.myGroupsList}>{myGroupsRender}</div>
                </div>

                <div className={styles.findGroupsContainer}>
                    <div className={styles.groupSection}><h1 className='section-title'><span>Find Groups</span></h1></div>
                    <div className={styles.groupSection}>
                        <div className={styles.groupSearchBar}>
                            <SearchBar onSearch={this.searchGroups} onChange={this.nameChangeHandler} placeholder="Group Name"/>
                            <select defaultValue={0} className={styles.groupSelectLevel} onChange={this.levelChangeHandler}>
                                <option value={0}>None</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <Link href="/join-group">
                                <a className='button'>Join by ID</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.foundGroups}>
                        {searchResultsRender}
                    </div>

                </div>
            </div>
        </div>
    };
};
export default Groups;
