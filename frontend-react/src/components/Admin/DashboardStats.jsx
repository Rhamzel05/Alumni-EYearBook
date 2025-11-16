import React from 'react';

const DashboardStats = ({ stats, onRefresh }) => {
  if (!stats) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Alumni',
      value: stats.totalAlumni,
      color: 'bg-blue-500',
      icon: '👥'
    },
    {
      title: 'Pending Registrations',
      value: stats.pendingRegistrations,
      color: 'bg-yellow-500',
      icon: '⏳'
    },
    {
      title: 'New This Month',
      value: stats.newThisMonth,
      color: 'bg-green-500',
      icon: '🆕'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      color: 'bg-purple-500',
      icon: '✅'
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Dashboard Overview</h3>
        <button
          onClick={onRefresh}
          className="btn-secondary btn-sm"
        >
          ↻ Refresh
        </button>
      </div>
      
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;