import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Rectangle } from 'recharts';

const data = [
    {
        name: 'January',
        clicks: 1547,
    },
    {
        name: 'February',
        clicks: 2134,
    },
    {
        name: 'March',
        clicks: 1892,
    },
    {
        name: 'April',
        clicks: 2456,
    },
    {
        name: 'May',
        clicks: 1763,
    },
    {
        name: 'June',
        clicks: 2890,
    },
    {
        name: 'July',
        clicks: 3245,
    },
    {
        name: 'August',
        clicks: 2967,
    },
    {
        name: 'September',
        clicks: 2234,
    },
    {
        name: 'October',
        clicks: 1876,
    },
    {
        name: 'November',
        clicks: 2456,
    },
    {
        name: 'December',
        clicks: 1923,
    },
];


export default class Analytics extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    return (
      <ResponsiveContainer width="90%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}