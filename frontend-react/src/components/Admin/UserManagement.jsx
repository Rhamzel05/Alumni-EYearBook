import React, { useState } from 'react';


export default function UserManagement(){
const [search, setSearch] = useState('');
const users = [{ id:1, name:'John Doe', email:'john@example.com', role:'alumni', status:'active' }];


const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));


return (
<div>
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold">User Management</h3>
<button className="px-3 py-2 bg-indigo-600 text-white rounded">+ Add New User</button>
</div>


<div className="bg-white p-6 rounded-xl shadow">
<div className="flex items-center gap-3 mb-6">
<input value={search} onChange={(e)=>setSearch(e.target.value)} className="border rounded px-3 py-2 w-full sm:w-80" placeholder="Search users" />
</div>


<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="text-xs text-gray-500 uppercase">
<tr>
<th className="px-4 py-2">User</th>
<th className="px-4 py-2">Role</th>
<th className="px-4 py-2">Status</th>
<th className="px-4 py-2">Actions</th>
</tr>
</thead>
<tbody>
{filtered.map(u => (
<tr key={u.id} className="border-t">
<td className="px-4 py-3">{u.name}<div className="text-sm text-gray-500">{u.email}</div></td>
<td className="px-4 py-3">{u.role}</td>
<td className="px-4 py-3">{u.status}</td>
<td className="px-4 py-3"> <button className="text-indigo-600">Edit</button> </td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
);
}