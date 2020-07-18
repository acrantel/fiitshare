import React, { Component } from 'react';
import Link from 'next/link'
import Header from '../components/header.js';
import GroupCard from '../components/cards/group-card.js';
import CreateGroup from '../components/add-group/create-group.js';
import { getUserGroups } from '../utils/api.js';

import styles from './page.module.css';
import SearchBar from '../components/search-bar.js';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.levelChangeHandler = this.levelChangeHandler.bind(this);
        this.searchGroups = this.searchGroups.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

        this.state = {
            togglePopup: false,
            yourGroups: [],
            searchableGroups: [],
            searchResults: [],
            nameSearch: '',
            levelSearch: 0
        };
    }
    
    async componentDidMount() {
        const { yours, searchable } = await getUserGroups(this.props.userId);
        this.setState({
            yourGroups: yours,
            searchableGroups: searchable,
            // initial 'search results' (display any group that does not contain user)
            searchResults: [...searchable]
        });
    }

    searchGroups() {
        let results = [];
        // uses state variables nameSearch and levelSearch
        const nameSearch = this.state.nameSearch.toLowerCase();
        const levelSearch = this.state.levelSearch.toLowerCase();
        for (const group of this.state.searchableGroups) {
            // add to results if matching and user is not in the group already
            if (nameSearch) {
                if (!group.name.toLowerCase().include(nameSearch)) continue;
            }
            if (levelSearch) {
                if (group.level.toLowerCase() !== levelSearch) continue;
            }
            results.push(group); // add the group to search results
        }
        this.setState({ searchResults: results });
    };

    togglePopup() {
        this.setState({togglePopup: !this.state.togglePopup});
    }

    // onchange handler for the group name search text field
    nameChangeHandler = (event) => { this.setState({ nameSearch: event.target.value }) };

    // onchange handler for the group name search text field
    levelChangeHandler = (event) => { this.setState({ levelSearch: event.target.value }) };

    render() {
        const { userId, userDatum } = this.props;
        
        var myGroupsRender = [];
        // for each of the user's groups
        for (let { id, ...group } of this.state.yourGroups) {
            myGroupsRender.push(<GroupCard key={id} groupID={id} groupDatum={group} isYours={true} />);
        }

        var searchResultsRender = [];
        for (let { id, ...group } of this.state.searchResults) {
            searchResultsRender.push(<GroupCard key={id} groupID={id} groupDatum={group} isYours={false} />);
        }

        return <div className={styles.pageWrapper}>
            <Header current={'groups'} userId={userId} userDatum={userDatum} />
            <div className={styles.pageContent} style={{ flexDirection: 'column' }}>
                <div className={styles.myGroupsContainer}>
                    <div className={styles.groupSection}>
                        <h1 className='section-title'><span>My Groups</span></h1>
                        <div>
                                <a className='button' onClick={this.togglePopup}>Create a Group</a>
                            {this.state.togglePopup && <CreateGroup userId={this.props.userId} />}
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
