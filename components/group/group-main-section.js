import React, { Component } from 'react';
import styles from './group-main-section.module.css';
import Tabs from '../tabs.js';

export default class GroupMainSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <div className={styles.mainSection}>
            <Tabs>
                <div label="Schedule">
                    
                </div>
                <div label="Members">
                </div>
            </Tabs>
        </div>
    }
}

