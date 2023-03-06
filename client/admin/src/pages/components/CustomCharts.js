import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
function CustomCharts({data}){
    const COLORS = ['#262B40', '#48506e', '#7882ad'];
    return (
        <>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="number"
                        isAnimationActive={true}
                        data={data}
                        cx="60%"
                        cy="50%"
                        outerRadius={130}
                        fill="#262B40"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}</Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
        </>
    );
  }

  export default CustomCharts;