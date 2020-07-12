import React, { Component } from 'react';

class Dashboard extends React.Component {
    render () {
        return <div>
            <Recent userId={this.props.userId}/>
            <Feed/>
        </div>
    }
}



export default Dashboard;