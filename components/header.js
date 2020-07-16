import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js'
import {userData, USERID} from '../database/database.js'
import {MdExpandMore} from 'react-icons/md'

class Header extends React.Component {
    render() {
        return <div className={styles.header}>
            <div className={styles.headerContent}>
                <img className={styles.logo} src="/images/logo.png" alt="Logo" />
                <div className={styles.navBar}>
                    <Link href="/"><a className={styles.navElement}>Dashboard</a></Link>
                    <Link href="/groups"><a className={styles.navElement}>Groups</a></Link>
                    <Link href="/workouts"><a className={styles.navElement}>Workouts</a></Link>
                </div>
                <SearchBar/>
                <span className={styles.space} />
                <RightNavBar userId={this.props.userId || USERID}/>
            </div>
        </div>
    }
}

class RightNavBar extends React.Component {
    render() {
        const {
            userId
        } = this.props;
        return <div className={styles.rightNavBar}>
                <Link href="/user/[userId]" as={`/user/${userId}`}>
                    <a><img className={styles.userImage} src={userData[userId].picture} /></a>
                </Link>
            <div className={styles.dropdown}>
                <MdExpandMore className={styles.arrowIcon} />
                <div className={styles.dropdownContent}>
                    <Link href="/profile">
                        <a className={styles.linkBox}>Profile</a>
                    </Link>
                    <a className={styles.linkBox} href="#">Sign out</a>
                </div>
            </div>
        </div>
    }
}

export default Header