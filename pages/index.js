import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/dashboard/sidebar.js';
import Dashboard from '../components/dashboard/dashboard-center.js';
import {userData, workoutData, exerciseData, groupData} from '../database/database.js';
const USERID='user1';

class Home extends React.Component {
    render() {
        return <div>
            <Header />
            <div>
                <Sidebar imageSrc={userData[USERID]['picture']} title={userData[USERID]['name']} 
                workoutTime={userData[USERID]['time_spent']} calories={userData[USERID]['calories']} 
                numWorkouts={userData[USERID]['completed_workouts']}/>
                <Dashboard userId={USERID}/>
            </div>
        </div>
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f7f7fa';
    }
}
export default Home