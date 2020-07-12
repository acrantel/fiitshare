import React, { Component } from 'react';
import Header from '../components/header.js';
import Sidebar from '../components/dashboard/sidebar.js';


class Home extends React.Component {
    render() {
        return <div>
            <Header />
            <div>
                <Sidebar imageSrc="/images/testuser.jpeg" title="John Doe" 
                workoutTime="10 hours 15 minutes" calories="2000" numWorkouts={20}/>
                
            </div>
        </div>
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f7f7fa';
    }
}
export default Home