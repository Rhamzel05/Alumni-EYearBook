import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardStats from "../../components/Admin/DashboardStats"; // Assuming this handles the main 4 stats
import PendingRegistrations from "../../components/Admin/PendingRegistrations"; 
import AlumniCharts from "../../components/Admin/AlumniCharts"; // Assuming this component is implemented for charts

// --- UI Utility Components (New/Enhanced) ---

// Reusable Stats Card for the main dashboard metrics
const StatCard = ({ title, value, icon, color, subText }) => (
  <div className={`p-6 rounded-xl shadow-lg border border-gray-100 ${color === 'indigo' ? 'bg-white hover:shadow-xl transition-shadow' : 'bg-white hover:shadow-xl transition-shadow'}`}>
    <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 ${
        color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
        color === 'green' ? 'bg-green-100 text-green-600' :
        color === 'blue' ? 'bg-blue-100 text-blue-600' :
        'bg-gray-100 text-gray-600'
    }`}>
      <span className="text-xl">{icon}</span>
    </div>
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <div className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</div>
    {subText && <p className="text-xs text-gray-400 mt-2">{subText}</p>}
  </div>
);

// Sidebar Component for Desktop Navigation
const Sidebar = ({ tabs, activeTab, setActiveTab }) => (
    <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white shadow-xl">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="px-4 mb-8">
                        <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                            <span className="mr-2 text-indigo-600">🎓</span> Alumni Admin
                        </h2>
                    </div>
                    <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group flex items-center px-3 py-2 text-sm font-semibold rounded-lg w-full text-left transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <span className="mr-3 text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    </div>
);

// Recent Activity Component (Enhanced Styling)
const RecentActivity = () => {
    const activities = [
      { id: 1, user: 'John Doe', action: 'registered', time: '2 minutes ago', type: 'success' },
      { id: 2, user: 'Jane Smith', action: 'updated profile', time: '5 minutes ago', type: 'info' },
      { id: 3, user: 'Mike Johnson', action: 'joined event', time: '1 hour ago', type: 'warning' },
      { id: 4, user: 'Sarah Wilson', action: 'added photo', time: '2 hours ago', type: 'info' },
      { id: 5, user: 'Admin', action: 'approved registration', time: '3 hours ago', type: 'success' }
    ];
  
    const getActivityIcon = (type) => {
      switch (type) {
        case 'success': return '✅';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
        default: return '📝';
      }
    };
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
              </div>
              <div className="flex-1 min-w-0 pb-2 border-b border-gray-100 last:border-b-0">
                <p className="text-sm text-gray-900 truncate">
                  <span className="font-medium text-indigo-600">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

// Stand-in for AlumniCharts component (for Dashboard)
const DashboardCharts = () => (
    <div className="lg:col-span-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni per Program</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">Bar Chart Placeholder</p>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni per Batch</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">Pie Chart Placeholder</p>
                </div>
            </div>
        </div>
    </div>
);


// AnalyticsDashboard Component (Enhanced Styling)
const AnalyticsDashboard = () => {
    const [timeRange, setTimeRange] = useState('7days');
  
    const analyticsData = {
      pageViews: { title: 'Page Views', icon: '👀', color: 'indigo', current: 1234, previous: 1102, change: 12 },
      activeSessions: { title: 'Active Sessions', icon: '👤', color: 'green', current: 567, previous: 525, change: 8 },
      engagementRate: { title: 'Engagement Rate', icon: '👍', color: 'blue', current: 89, previous: 86, change: 3 },
      newRegistrations: { title: 'New Registrations', icon: '➕', color: 'red', current: 45, previous: 38, change: 18 }
    };
  
    const calculateChangeText = (data) => {
        const sign = data.change >= 0 ? '↑' : '↓';
        const colorClass = data.change >= 0 ? 'text-green-600' : 'text-red-600';
        return (
            <span className={`text-sm font-medium ${colorClass}`}>
                {sign} {Math.abs(data.change)}% from previous period
            </span>
        );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900">Advanced Analytics</h3>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(analyticsData).map(([key, data]) => (
            <div key={key} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg w-10 h-10 flex items-center justify-center ${
                        data.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                        data.color === 'green' ? 'bg-green-100 text-green-600' :
                        data.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                    }`}>
                        <span className="text-lg">{data.icon}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{data.title}</p>
                        <div className="text-2xl font-bold text-gray-900">{data.current.toLocaleString()}</div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                    {calculateChangeText(data)}
                </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">User Engagement Trends</h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-indigo-200 p-4">
                <div className="text-center">
                    <div className="text-5xl mb-2">📊</div>
                    <p className="text-gray-500">Line Chart Visualization (Full Width)</p>
                    <p className="text-sm text-gray-400 mt-1">Chart.js or similar would be integrated here</p>
                </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Traffic Sources</h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 p-4">
              <div className="text-center">
                <div className="text-5xl mb-2">🌐</div>
                <p className="text-gray-500">Traffic Sources Pie Chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
// UserManagement Component (Enhanced Styling)
const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
  
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'alumni', status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'alumni', status: 'active', joinDate: '2024-01-10' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', status: 'pending', joinDate: '2024-01-20' },
      { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', status: 'active', joinDate: '2024-01-05' }
    ];
  
    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleClasses = (role) => {
        switch(role) {
            case 'admin': return 'bg-purple-100 text-purple-800';
            case 'alumni': return 'bg-green-100 text-green-800';
            case 'student': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusClasses = (status) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'inactive': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            + Add New User
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="pb-4 mb-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
              <div className="flex space-x-3">
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="alumni">Alumni</option>
                  <option value="student">Student</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-indigo-600 text-sm font-bold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleClasses(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClasses(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-300 text-7xl mb-4">🚫</div>
              <h4 className="text-xl font-medium text-gray-900 mb-2">No users found</h4>
              <p className="text-gray-600">Try adjusting your search filters or search term.</p>
              <button 
                onClick={() => { setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
                className="mt-6 px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

// --- Main AdminDashboard Component ---

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [lastUpdated, setLastUpdated] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' }, // Changed icon for dashboard
        { id: 'registrations', label: 'Pending Registrations', icon: '⏳' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'users', label: 'User Management', icon: '👥' }
    ];

    useEffect(() => {
        fetchDashboardStats();
        
        // Refresh stats every 5 minutes
        const interval = setInterval(fetchDashboardStats, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError('');
            // Using mock data since API might not be ready
            const mockStats = {
                totalAlumni: 1250,
                pendingRegistrations: 8,
                newThisMonth: 45,
                activeUsers: 890,
                totalEvents: 23,
                upcomingEvents: 3
            };
            setStats(mockStats);
            setLastUpdated(new Date());
            
            // Uncomment when API is ready:
            // const response = await axios.get('/api/admin/dashboard-stats');
            // setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Failed to load dashboard statistics. Please try again.');
            
            // Set fallback data for demo purposes
            setStats({
                totalAlumni: 1250,
                pendingRegistrations: 8,
                newThisMonth: 45,
                activeUsers: 890,
                totalEvents: 23,
                upcomingEvents: 3
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDashboardStats();
    };

    const renderTabContent = () => {
        if (loading && !stats) {
            return (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            );
        }
        
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        {/* Main Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                title="New This Month" 
                                value={stats?.newThisMonth || 0} 
                                icon="✨" 
                                color="indigo"
                                subText="New registrations in the current month"
                            />
                            <StatCard 
                                title="Active Users" 
                                value={stats?.activeUsers || 0} 
                                icon="🟢" 
                                color="green"
                                subText="Currently active accounts"
                            />
                             <StatCard 
                                title="Pending Registrations" 
                                value={stats?.pendingRegistrations || 0} 
                                icon="⏳" 
                                color="red"
                                subText="Awaiting admin approval"
                            />
                            <StatCard 
                                title="Total Alumni" 
                                value={stats?.totalAlumni || 0} 
                                icon="🧑‍🎓" 
                                color="blue"
                                subText="Total number of registered alumni"
                            />
                        </div>
                        
                        {/* Charts and Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Replaced AlumniCharts with an in-place component for demonstration */}
                            <DashboardCharts />
                            <RecentActivity />
                        </div>
                    </div>
                );
            
            case 'registrations':
                // Using a simple placeholder for PendingRegistrations component
                return (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pending Registrations</h3>
                        <p className="text-gray-600">
                            A list/table of new user registrations requiring admin approval would be displayed here.
                        </p>
                        <PendingRegistrations /> 
                    </div>
                );
            
            case 'analytics':
                return <AnalyticsDashboard />;
            
            case 'users':
                return <UserManagement />;
            
            default:
                return (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <p className="text-xl text-gray-500">Select a tab to view content</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden bg-white shadow-md border-b">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                    >
                        <span className="text-2xl">{sidebarOpen ? '✕' : '☰'}</span>
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar Navigation - Mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden">
                        <div 
                            className="fixed inset-0 bg-gray-600 bg-opacity-75"
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full shadow-2xl">
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="px-4 mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-indigo-100 text-indigo-700'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <span className="mr-3 text-lg">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar Navigation - Desktop */}
                <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content */}
                <div className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900">
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </h1>
                                    <p className="text-gray-500 mt-1">
                                        {activeTab === 'dashboard' ? 'Overview of the Alumni E-YearBook System' : 'Manage system operations'}
                                    </p>
                                    {lastUpdated && (
                                        <p className="text-sm text-gray-400 mt-2">
                                            Last updated: <span className="font-medium">{lastUpdated.toLocaleTimeString()}</span>
                                        </p>
                                    )}
                                </div>
                                
                                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                                    {error && (
                                        <span className="text-sm text-red-700 bg-red-100 px-3 py-1.5 rounded-full font-medium shadow-sm">
                                            ⚠️ {error}
                                        </span>
                                    )}
                                    <button
                                        onClick={handleRefresh}
                                        className="px-4 py-2 bg-white text-indigo-600 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 flex items-center"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent mr-2"></div>
                                                Refreshing...
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-lg mr-1">↻</span> Refresh Data
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;