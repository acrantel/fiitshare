import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js'
import {userData, USERID} from '../database/database.js'
import {MdExpandMore} from 'react-icons/md'

function NavLink ({ link, label, id, current }) {
    return <Link href={link}>
        <a className={`${styles.navElement} ${
            id === current ? styles.currentNavElement : ''}`
        }>{label}</a>
    </Link>;
}

class Header extends React.Component {
    render() {
        const {
            userId = USERID,
            current
        } = this.props;
        return <div className={styles.header}>
            <div className={styles.headerContent}>
                <img className={styles.logo} src="/images/logo.png" alt="Logo" />
                <div className={styles.navBar}>
                    <NavLink link="/" label="Dashboard" id="dashboard" current={current} />
                    <NavLink link="/groups" label="Groups" id="groups" current={current} />
                    <NavLink link="/workouts" label="Workouts" id="workouts" current={current} />
                </div>
                <SearchBar/>
                <span className={styles.space} />
                <RightNavBar userId={userId}/>
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