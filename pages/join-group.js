import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import AddGroup from '../components/add-group/add-group.js';
import LabelledInput from '../components/add-group/labelled-input.js';

export default class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onJoin = this.onJoin.bind(this);
        this.onGroupIdChange = this.onGroupIdChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.state = {
            groupId: '',
            code: '',
            showCode: false
        };
    }
    
    onJoin(e) {
        console.log('join', this.state.groupId);
        e.preventDefault();
    }
    
    onGroupIdChange(e) {
        this.setState({
            groupId: e.target.value,
            showCode: true // TEMP
        });
    }
    
    onCodeChange(e) {
        this.setState({
            code: e.target.value
        });
    }
    
    render() {
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent} style={{alignItems: 'center'}}>
                <AddGroup title="Join a group" submitLabel="Join" onSubmit={this.onJoin}>
                    <LabelledInput label="Group ID" onChange={this.onGroupIdChange} />
                    {this.state.showCode ? (
                        <LabelledInput label="Code" onChange={this.onCodeChange} slideIn />
                    ) : null}
                </AddGroup>
            </div>
        </div>
    }
}
