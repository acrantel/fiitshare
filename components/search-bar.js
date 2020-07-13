import React, { Component } from 'react';
import Link from 'next/link'
import styles from './search-bar.module.css'
import { MdSearch } from 'react-icons/md'

class SearchBar extends React.Component {
    render() {
        return <div className={styles.searchBar}>
            <MdSearch onClick={this.props.onSearch} className={styles.searchIcon} />
            <input onKeyUp={(event) => {
                if (event.key === 'Enter') {
                    this.props.onSearch();
                }
            }} 
            className={styles.searchInput} style={{ justifySelf: 'end' }} type="text"
                onChange={this.props.onChange} placeholder={this.props.placeholder}></input>
        </div>
    }
}

export default SearchBar