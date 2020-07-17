import React from 'react';
import { auth } from '../database/firestore.js';

import SignIn from '../pages/signin.js';

const withAuth = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                status: 'LOADING',
                userId: '',
            }
        }
        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    this.setState({
                        status: 'SIGNED_IN',
                        userId: authUser.uid,
                    });

                    if (authUser.metadata.creationTime === authUser.metadata.lastSignInTime) {
                        let userid = authUser.uid;
                        const data = {
                            workouts: [],
                            recent_workouts: [],
                            completed_workouts: 0,
                            groups: [],
                            name: authUser.displayName,
                            profile_picture: "",
                            cover_picture: "",
                            calories: 0,
                            time_spent: 0,
                            this_week: {}
                        };

                        fetch(`http://localhost:3000/api/user/${userid}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                    }

                    
                } else {
                    this.setState({ status: 'LOADING' });
                }
            });
        }
        renderContent() {
            const { status } = this.state;
            if (status == 'LOADING') {
                return <SignIn></SignIn>;
            } else if (status == 'SIGNED_IN') {
                return <Component {...this.props} />
            }
        }
        render() {
            return <div>{this.renderContent()}</div>
        }
    };
}
export default withAuth;