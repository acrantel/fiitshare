import React, { Component } from 'react';
import Link from 'next/link'
import styles from './search-bar.module.css'
import { MdSearch } from 'react-icons/md'

class SearchBar extends React.Component {
    render() {
        return <div className={styles.searchBar}>
            <MdSearch className={styles.searchIcon}/>
            <input style={{justifySelf:'end'}} className={styles.input} type="text"></input>
        </div>
    }
}

export default SearchBar