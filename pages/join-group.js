import React, { Component } from 'react';
import Header from '../components/header.js';
import styles from './page.module.css';
import AddGroup from '../components/add-group/add-group.js';
import LabelledInput from '../components/add-group/labelled-input.js';
import withAuth from '../helpers/withAuth.js';
import { joinGroup } from '../utils/api.js';
import Router from 'next/router';

class JoinGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onJoin = this.onJoin.bind(this);
        this.onGroupIdChange = this.onGroupIdChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.state = {
            groupId: '',
            code: '',
            showCode: false // QUESTION: Do we need this?
        };
    }
    
    async onJoin(e) {
        e.preventDefault();
        const { groupId } = this.state;
        const { userId } = this.props;
        await joinGroup(groupId, userId);
        Router.push('/group/[groupid]', `/group/${groupId}`);
    }
    
    onGroupIdChange(e) {
        this.setState({
            groupId: e.target.value
        });
    }
    
    onCodeChange(e) {
        this.setState({
            code: e.target.value
        });
    }
    
    render() {
        const { userId, userDatum } = this.props;
        return <div className={styles.pageWrapper}>
            <Header current={'groups'} userId={userId} userDatum={userDatum} />
            <div className={styles.pageContent} style={{alignItems: 'center'}}>
                <AddGroup title="Join a group" submitLabel="Join" onSubmit={this.onJoin}>
                    <LabelledInput label="Group ID">
                        <input type="text" onChange={this.onGroupIdChange} />
                    </LabelledInput>
                    {this.state.showCode ? (
                        <LabelledInput label="Code" slideIn>
                            <input type="text" onChange={this.onCodeChange} />
                        </LabelledInput>
                    ) : null}
                </AddGroup>
            </div>
        </div>
    }
}

export default withAuth(JoinGroup);
