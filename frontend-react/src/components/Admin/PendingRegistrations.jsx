import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function PendingRegistrations(){
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(()=>{ fetchData(); }, []);
async function fetchData(){
try{
setLoading(true);
// replace with real API
const res = await axios.get('/api/admin/pending-registrations');
setItems(res.data.data || []);
}catch(e){
setItems([]);
}finally{ setLoading(false); }
}


if(loading) return <div className="p-6 bg-white rounded-xl shadow">Loading…</div>;
if(items.length === 0) return <div className="p-6 bg-white rounded-xl shadow">No pending registrations</div>;


return (
<div className="p-6 bg-white rounded-xl shadow">
<h3 className="font-semibold mb-4">Pending Registrations</h3>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="text-xs text-gray-500 uppercase">
<tr><th className="px-4 py-2">User</th><th className="px-4 py-2">Program</th><th className="px-4 py-2">Actions</th></tr>
</thead>
<tbody>
{items.map(i => (
<tr key={i.id} className="border-t">
<td className="px-4 py-3">{i.first_name} {i.last_name}</td>
<td className="px-4 py-3">{i.program}</td>
<td className="px-4 py-3"><button className="text-green-600 mr-2">Approve</button><button className="text-red-600">Reject</button></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}