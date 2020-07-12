import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/sidebar.js';


class Home extends React.Component {
    render() {
        return <div>
            <Header />
            <div>
                <Sidebar imageSrc="/images/testuser.jpeg" title="User user" 
                workoutTime="10 hours 15 minutes" calories="2000" numWorkouts={20}/>
            </div>
        </div>
    }
}
export default Home