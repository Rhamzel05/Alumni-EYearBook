import React from 'react';


export default function StatCard({ title, value, icon, color = 'indigo' }) {
const colorMap = {
indigo: 'bg-indigo-100 text-indigo-600',
green: 'bg-green-100 text-green-600',
blue: 'bg-blue-100 text-blue-600',
red: 'bg-red-100 text-red-600'
};


return (
<div className="p-6 rounded-xl shadow border bg-white">
<div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 ${colorMap[color]}`}>
<span className="text-xl">{icon}</span>
</div>
<p className="text-sm font-medium text-gray-500">{title}</p>
<div className="text-3xl font-bold text-gray-900 mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</div>
</div>
);
}