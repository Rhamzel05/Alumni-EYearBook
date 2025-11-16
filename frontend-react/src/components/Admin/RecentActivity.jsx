import React from 'react';


export default function RecentActivity(){
const activities = [
{ id:1, user:'John Doe', action:'registered', time:'2m' },
{ id:2, user:'Jane Smith', action:'updated profile', time:'5m' },
{ id:3, user:'Mike Johnson', action:'joined event', time:'1h' },
];


return (
<div className="bg-white rounded-xl shadow p-6 lg:col-span-1">
<div className="flex justify-between items-center mb-4">
<h3 className="font-semibold">Recent Activity</h3>
<button className="text-sm text-indigo-600">View All</button>
</div>
<div className="space-y-4">
{activities.map(a => (
<div key={a.id} className="flex items-start gap-4">
<div className="pt-1">📝</div>
<div className="flex-1">
<div className="text-sm"><span className="font-medium text-indigo-600">{a.user}</span> {a.action}</div>
<div className="text-xs text-gray-500 mt-1">{a.time}</div>
</div>
</div>
))}
</div>
</div>
);
}