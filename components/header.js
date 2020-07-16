import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js'
import {userData} from '../database/database.js'
import {MdExpandMore} from 'react-icons/md'

const USERID = 'user1';
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
           <RightNavBar/>
        </div>
    }
}

class RightNavBar extends React.Component {
    render() {
        return <div className={styles.rightNavBar}>
                <Link href="/user/[userId]" as={`/user/${USERID}`}>
                    <a><img className={styles.userImage} src={userData[USERID].picture} /></a>
                </Link>
            <div className={styles.dropdown}>
                <MdExpandMore className={styles.arrowIcon} />
                <div className={styles.dropdownContent}>
                    <div className={styles.linkBox}>
                        <Link href="/user/[userId]" as={`/user/${USERID}`}>
                            <a href="/user/[userId]">Profile</a>
                        </Link>
                    </div>
                    <div className={styles.linkBox}>
                        <a href="#TODO-sign-out">Sign out</a>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Header