import React from 'react';
import { auth } from '../database/firestore.js';
import {ensureUserExists, setUserValues} from '../utils/api.js';

import { SignIn } from '../pages/signin.js';
import Loading from '../components/loading.js';
import Header from '../components/header.js';

// TEMP
function randomProfilePicture () {
    return `/images/user${(Math.random() * 6 | 0) + 1}.jpg`;
}
function randomCoverPicture () {
    return `/images/user${(Math.random() * 3 | 0) + 1}-cover.jpg`;
}

const withAuth = (Component, { header = false } = {}) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.updateUser = this.updateUser.bind(this);
            this.state = {
                status: 'LOADING',
                userId: null,
                userDatum: null,
                queuedUpdate: null
            };
        }
        
        componentDidMount() {
            auth.onAuthStateChanged(async authUser => {
                if (authUser) {
                    this.setState({
                        status: 'LOADING',
                        queuedUpdate: null
                    });
                    const userId = authUser.uid;
                    const userDatum = await ensureUserExists(userId, {
                        // displayName and photoURL are null if signing in the
                        // non-Google way
                        name: authUser.displayName || '[Name coming shortly]',
                        profile_picture: authUser.photoURL || randomProfilePicture(),
                        cover_picture: randomCoverPicture()
                    });
                    const queuedUpdate = this.state.queuedUpdate;
                    this.setState({
                        status: 'SIGNED_IN',
                        userId: authUser.uid,
                        userDatum: userDatum,
                        queuedUpdate: null
                    }, async () => {
                        if (queuedUpdate) {
                            console.log('There was a queued update! I shall update now.');
                            await this.updateUser(queuedUpdate);
                        }
                    });
                } else {
                    this.setState({ status: 'SIGNED_OUT' });
                }
            });
        }
        
        async updateUser(update) {
            if (this.state.status === 'SIGNED_OUT') {
                throw new Error('User is not signed in, contrary to what you may believe.');
            }
            if (this.state.status === 'LOADING') {
                console.log('I received an update, but I\'m still loading! Queuing for later.');
                this.setState({
                    queuedUpdate: { ...(this.state.queuedUpdate || {}), ...update }
                });
                return;
            }
            await setUserValues(this.state.userId, update);
            this.setState({
                userDatum: { ...this.state.userDatum, ...update }
            });
        }
        
        render() {
            const { status, userId, userDatum } = this.state;
            if (status == 'LOADING') {
                return header
                    ? <Component loading={true} {...this.props} />
                    : <Loading />;
            } else if (status == 'SIGNED_OUT') {
                return header
                    ? <Component {...this.props} />
                    : <SignIn updateUser={this.updateUser} />;
            } else if (status == 'SIGNED_IN') {
                return <Component
                    userId={userId}
                    userDatum={userDatum}
                    updateUser={this.updateUser}
                    {...this.props}
                />;
            }
        }
    };
}
export default withAuth;

export const AuthHeader = withAuth(Header, { header: true });
