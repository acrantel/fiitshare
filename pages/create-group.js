import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import AddGroup from '../components/add-group/add-group.js';
import LabelledInput from '../components/add-group/labelled-input.js';

export default class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);
        this.onLevelChange = this.onLevelChange.bind(this);
        this.state = {
            groupName: '',
            level: ''
        };
    }
    
    onCreate(e) {
        console.log('create', this.state);
        e.preventDefault();
    }
    
    onGroupNameChange(e) {
        this.setState({
            groupName: e.target.value
        });
    }
    
    onLevelChange(e) {
        this.setState({
            level: e.target.value
        });
    }
    
    render() {
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{alignItems: 'center'}}>
                <AddGroup title="Create a group" submitLabel="Create" onSubmit={this.onCreate}>
                    <LabelledInput label="Group Name" onChange={this.onGroupNameChange} />
                    <LabelledInput label="Level" onChange={this.onLevelChange} />
                </AddGroup>
            </div>
        </div>
    }
}
