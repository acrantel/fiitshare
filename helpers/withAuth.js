import React from 'react';
import router from 'next/router';
import { auth } from '../database/firestore.js';

import SignIn from '../pages/signin.js';

const withAuth = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                status: 'LOADING',
            }
        }
        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                console.log("on auth state change");
                console.log(authUser);
                if (authUser) {
                    this.setState({
                        status: 'SIGNED_IN'
                    });
                    console.log(this.state.status);
                    console.log(authUser);
                    console.log(authUser.uid);

                    let userid = authUser.uid;

                    const data = { 
                        workouts: [], 
                        recent_workouts: [],
                        completed_workouts: 0, 
                        groups: [],
                        name, profile_picture, cover_picture, calories, time_spent, this_week };
                  
                   fetch(`http://localhost:3000/api/user/${userid}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then(res => {
                                console.log(res);
                                res.ok ? res.json() : Promise.reject(new Error(res.status));};
                } else {
                    this.setState({status: 'LOADING'});
                }
            });
        }
        renderContent() {
            const { status } = this.state;
            if (status == 'LOADING') {
                return <div><h1>Loading ......</h1><SignIn></SignIn></div>;
            } else if (status == 'SIGNED_IN') {
                return <Component {...this.props} />
            }
        }
        render() {
            return (
                <React.Fragment>
                    {this.renderContent()}
                </React.Fragment>
            );
        }
    };
}
export default withAuth;