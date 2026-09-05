import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Rectangle } from 'recharts';
import type { MonthlyData } from '../../../types/statistics';

interface AnalyticsProps{
    data:MonthlyData[]
}


export default class Analytics extends PureComponent<AnalyticsProps> {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    const {data}= this.props;

    return (
      <ResponsiveContainer width="85%" height="85%">
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