import React, { Component } from 'react';
import Header from '../header.js';
import styles from '../add-group/create-group.module.css';
import AddGroup from './add-group.js';
import LabelledInput from './labelled-input.js';

export default class CreateGroup extends React.Component {
    // pass in userId prop
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);
        this.onLevelChange = this.onLevelChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.state = {
            groupName: '',
            description: '',
            level: ''
        };
    }
    
    onCreate(e) {
        console.log('create', this.state);
        e.preventDefault();

        // get the state variables and create a group
    }
    
    onGroupNameChange(e) {
        this.setState({
            groupName: e.target.value
        });
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
    
    onLevelChange(e) {
        this.setState({
            level: e.target.value
        });
    }

    render() {
        return <div className={styles.popup}>
            <AddGroup title="Create a group" submitLabel="Create" onSubmit={this.onCreate}>
                <LabelledInput label="Group Name">
                    <input type="text" onChange={this.onGroupNameChange} />
                </LabelledInput>
                <LabelledInput label="Description">
                    <input type="text" onChange={this.onDescriptionChange} />
                </LabelledInput>
                <LabelledInput label="Level">
                    <select onChange={this.onLevelChange}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </LabelledInput>
            </AddGroup>
        </div>
    }
}
