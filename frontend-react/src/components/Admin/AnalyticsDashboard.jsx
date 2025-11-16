import React, { useState } from 'react';


export default function AnalyticsDashboard(){
const [range, setRange] = useState('7days');
const cards = [
{ title: 'Page Views', value: 1234, icon: '👀' },
{ title: 'Active Sessions', value: 567, icon: '👥' },
{ title: 'Engagement Rate', value: '89%', icon: '👍' },
{ title: 'New Registrations', value: 45, icon: '➕' }
];


return (
<div className="space-y-6">
<div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
<h3 className="font-semibold">Advanced Analytics</h3>
<select value={range} onChange={(e) => setRange(e.target.value)} className="border rounded px-3 py-2">
<option value="7days">Last 7 days</option>
<option value="30days">Last 30 days</option>
</select>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{cards.map((c, i) => (
<div key={i} className="bg-white p-6 rounded-xl shadow">
<div className="flex items-center gap-3">
<div className="p-2 rounded-lg bg-gray-100">{c.icon}</div>
<div>
<p className="text-sm text-gray-500">{c.title}</p>
<p className="text-2xl font-bold">{c.value}</p>
</div>
</div>
</div>
))}
</div>
</div>
);
}