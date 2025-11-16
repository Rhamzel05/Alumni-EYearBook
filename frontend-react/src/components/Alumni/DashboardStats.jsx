import React from 'react';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Alumni',
      value: stats.total_alumni,
      color: 'bg-blue-600',
      icon: '👥',
    },
    {
      title: 'Approved Alumni',
      value: stats.approved_alumni,
      color: 'bg-green-600',
      icon: '✅',
    },
    {
      title: 'Pending Registrations',
      value: stats.pending_alumni,
      color: 'bg-yellow-500',
      icon: '⏳',
    },
    {
      title: 'Employment Rate',
      value: `${stats.employment_rate_percentage}%`,
      color: 'bg-purple-600',
      icon: '💼',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="card p-6">
          <div className="flex items-center">
            <div className={`${stat.color} rounded-lg p-3 mr-4 text-white`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;