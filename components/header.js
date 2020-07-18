import React, { Component } from 'react';
import Link from 'next/link'
import styles from './header.module.css'
import SearchBar from './search-bar.js';
import {auth} from '../database/firestore.js';
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
            userId,
            userDatum,
            current = null,
            loading = false
        } = this.props;
        return <div className={styles.header}>
            <div className={styles.headerContent}>
                <img className={styles.logo} src="/images/logo.png" alt="Logo" />
                {loading ? <>
                    <span className={styles.space} />
                </> : userId ? <>
                    <div className={styles.navBar}>
                        <NavLink link="/" label="Dashboard" id="dashboard" current={current} />
                        <NavLink link="/groups" label="Groups" id="groups" current={current} />
                        <NavLink link="/workouts" label="Workouts" id="workouts" current={current} />
                    </div>
                    <SearchBar/>
                    <span className={styles.space} />
                    <RightNavBar userId={userId} userDatum={userDatum}/>
                </> : <>
                    <span className={styles.space} />
                    <NavLink link="/signin" label="Sign in" id="sign-in" current={current} />
                </>}
            </div>
        </div>
    }
}

class RightNavBar extends React.Component {
    async signOut(e) {
        e.preventDefault();
        console.log('bye');
        await auth.signOut();
    }
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
                        <a href="#" onClick={this.signOut}>Sign out</a>
                    </div>
                </div>
            </div>
        </div>
    }
}


export default Header