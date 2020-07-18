import React from 'react';
import { auth } from '../database/firestore.js';
import {ensureUserExists, setUserValues} from '../utils/api.js';

import { SignIn } from '../pages/signin.js';
import Loading from '../components/loading.js';
import Header from '../components/header.js';

// TEMP
const names = ['Billy', 'Jane', 'Joe', 'Bob', 'Gugliana', 'Ferris', 'Johanna']
function randomName() {
    return names[Math.random() * names.length | 0];
}
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
                userDatum: null
            };
        }
        
        componentDidMount() {
            auth.onAuthStateChanged(async authUser => {
                if (authUser) {
                    const userId = authUser.uid;
                    const userDatum = await ensureUserExists(userId, {
                        // displayName and photoURL are null if signing in the
                        // non-Google way
                        name: authUser.displayName || randomName(),
                        profile_picture: authUser.photoURL || randomProfilePicture(),
                        cover_picture: randomCoverPicture()
                    });
                    this.setState({
                        status: 'SIGNED_IN',
                        userId: authUser.uid,
                        userDatum: userDatum
                    })
                } else {
                    this.setState({ status: 'SIGNED_OUT' });
                }
            });
        }
        
        async updateUser(update) {
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
