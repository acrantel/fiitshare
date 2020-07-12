import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';

class Profile extends React.Component {
    render() {
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent}>
                {/* TODO */}
            </div>
        </div>
    }
}
export default Profile
