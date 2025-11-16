import React from 'react';


export default function Sidebar({ tabs, activeTab, setActiveTab, openOnMobile, setOpenOnMobile }) {
return (
<aside className={`bg-white border-r hidden lg:flex lg:flex-shrink-0 w-64`}>
<div className="flex flex-col w-64">
<div className="px-4 py-6">
<h3 className="text-xl font-bold flex items-center"><span className="mr-2 text-indigo-600">🎓</span>Alumni Admin</h3>
</div>
<nav className="px-2 space-y-1">
{tabs.map(tab => (
<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 text-sm font-medium ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
<span className="text-lg">{tab.icon}</span>
{tab.label}
</button>
))}
</nav>
</div>


{/* Mobile Drawer */}
{openOnMobile && (
<div className="lg:hidden fixed inset-0 z-40">
<div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenOnMobile(false)} />
<div className="relative bg-white w-64 h-full shadow-xl">
<div className="px-4 py-6">
<button onClick={() => setOpenOnMobile(false)}>Close</button>
</div>
<nav className="px-2 space-y-1">
{tabs.map(tab => (
<button key={tab.id} onClick={() => { setActiveTab(tab.id); setOpenOnMobile(false); }} className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 text-sm font-medium ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
<span className="text-lg">{tab.icon}</span>
{tab.label}
</button>
))}
</nav>
</div>
</div>
)}
</aside>
);
}