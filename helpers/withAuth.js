import React from 'react';
import { auth } from '../database/firestore.js';
import {getUser, ensureUserExists} from '../utils/api.js';

import SignIn from '../pages/signin.js';
import Loading from '../components/loading.js';

const withAuth = (Component, { header = false } = {}) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
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
                    await ensureUserExists(userId, {
                        // displayName and photoURL are null if signing in the non-Google way
                        // TEMP values
                        name: authUser.displayName || 'Billy',
                        profile_picture: authUser.photoURL || 'https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg',
                        cover_picture: "https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg"
                    });
                    const userDatum = await getUser(authUser.uid);
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
        render() {
            const { status, userId, userDatum } = this.state;
            if (status == 'LOADING') {
                return header
                    ? <Component loading={true} {...this.props} />
                    : <Loading />;
            } else if (status == 'SIGNED_OUT') {
                return header
                    ? <Component {...this.props} />
                    : <SignIn />;
            } else if (status == 'SIGNED_IN') {
                return <Component userId={userId} userDatum={userDatum} {...this.props} />;
            }
        }
    };
}
export default withAuth;
