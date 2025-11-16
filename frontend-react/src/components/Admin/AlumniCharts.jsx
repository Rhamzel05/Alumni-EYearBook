import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';


const pieData = [
{ name: 'CS', value: 400 },
{ name: 'IT', value: 300 },
{ name: 'ENG', value: 300 }
];
const COLORS = ['#6366F1', '#10B981', '#F59E0B'];
const barData = [
{ batch: '2018', alumni: 120 },
{ batch: '2019', alumni: 150 },
{ batch: '2020', alumni: 180 }
];


export default function AlumniCharts(){
return (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-white rounded-xl shadow p-6">
<h3 className="font-semibold mb-4">Alumni per Program</h3>
<div style={{ height: 220 }}>
<ResponsiveContainer width="100%" height="100%">
<BarChart data={barData}>
<XAxis dataKey="batch" />
<YAxis />
<Tooltip />
<Bar dataKey="alumni" />
</BarChart>
</ResponsiveContainer>
</div>
</div>


<div className="bg-white rounded-xl shadow p-6">
<h3 className="font-semibold mb-4">Alumni per Batch</h3>
<div style={{ height: 220 }}>
<ResponsiveContainer width="100%" height="100%">
<PieChart>
<Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
{pieData.map((entry, index) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
</Pie>
</PieChart>
</ResponsiveContainer>
</div>
</div>
</div>
);
}