import React, { Component } from 'react';

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
            return timeFormatter(hours, minutes);
        }
        else {
            return val;
        }
    };

    render() {
        
        // create the data arrays
        let data = [];
        let index = 0;
        let value = [];
        if (this.props.valArr) {value=this.props.valArr}
        while (index < 7)
        {
            data[index] = {
                day: daysX[index],
                value: value[index],
            };

            index++;
        }
        console.log(data);

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
        <Bar dataKey="value" fill="#64b5f6" />
      </BarChart>
    }
}

export function timeFormatter(hours, minutes)
{
    let result = hours.toString() + ":" + minutes.toString().padStart(2, '0');
    return result;
}
    
export default UserChart