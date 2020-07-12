import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js'

class Header extends React.Component {
    render() {
        return <div className={styles.header}>
            <img className={styles.logo} src="/images/logo.png" alt="Logo" />
            <div className={styles.navBar}>
                <Link href="/"><a className={styles.navElement}>Dashboard</a></Link>
                <Link href="/groups"><a className={styles.navElement}>Groups</a></Link>
                <Link href="/workouts"><a className={styles.navElement}>Workouts</a></Link>
            </div>
            <SearchBar/>
        </div>
    }
}
export default Header