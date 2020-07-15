import React, { Component } from 'react';
import styles from '../user/user-chart.module.css';
import { userData } from '../../database/database.js';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


const daysX = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

// component displaying chart of User's activity or calories
class UserChart extends React.Component {
    constructor(props) {
        super(props);

        this.tickFormatter = this.tickFormatter.bind(this);
    }

    tickFormatter(val) {
        if (this.props.type == 'time') {
            let hours = Math.floor(val / 60);
            let minutes = val % 60;
            let result = hours.toString() + ":";
            if (minutes.toString().length == 2) {
                result += minutes.toString();
            }
            else {
                result += "0" + minutes.toString();
            }
            return result;
        }
        else {
            return val;
        }
    };

    render() {
        
        // create the data arrays
        let data = [];
        let index = 0;
        while (index < 7)
        {
            data[index] = {
                day: daysX[index],
                value: this.props.valArr[index],
            };

            index++;
        }

        return <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="day" type='category' tickLine={false}/>
    <YAxis tickFormatter={this.tickFormatter}/>
        <Bar dataKey="value" fill="#ff73d7" />
      </BarChart>
    }
}

    
export default UserChart