import React from 'react';
import { NormalDistributionChartProps } from './NormalDistributionChart.types';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const NormalDistributionChart: React.FC<NormalDistributionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer
      height={500}
      width={'100%'}
    >
      <ComposedChart
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='frequency' fill='#8884d8' />
        <Line type='natural' dataKey='frequency' stroke='#ff7300' animationDuration={500} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
