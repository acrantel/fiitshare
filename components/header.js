import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js';
import {auth, USERID} from '../database/firestore.js';
import {MdExpandMore} from 'react-icons/md';

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
            current,
            userDatum = {}
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
                <RightNavBar userId={userId} userDatum={userDatum}/>
            </div>
        </div>
    }
}

class RightNavBar extends React.Component {
    render() {
        const {
            userId,
            userDatum
        } = this.props;
        return <div className={styles.rightNavBar}>
                <Link href="/user/[userId]" as={`/user/${userId}`}>
                    <a><img className={styles.userImage} src={userDatum['profile_picture']} /></a>
                </Link>
            <div className={styles.dropdown}>
                <MdExpandMore className={styles.arrowIcon} />
                <div className={styles.dropdownContent}>
                    <div className={styles.linkBox}>
                        <Link href="/user/[userId]" as={`/user/${userId}`}>
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
Header.getInitialProps = async () => {
    const userId = auth.currentUser.uid;
    try {
        const userDatum = await getUser(userId);
        return { userId, userDatum };
    } catch ({ message: error }) {
        return { error };
    }
};


export default Header