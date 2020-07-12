import React, { Component } from 'react';
import Link from 'next/link'
import styles from './search-bar.module.css'
import { Search } from '@material-ui/icons';

class SearchBar extends React.Component {
    render() {
        return <div className={styles.searchBar}>
            <Search className={styles.searchIcon}/>
            <input style={{justifySelf:'end'}} className={styles.input} type="text"></input>
        </div>
    }
}

export default SearchBar