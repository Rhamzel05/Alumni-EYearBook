import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
        current_job_title: user.current_job_title || '',
        company_name: user.company_name || '',
        thesis_title: user.thesis_title || '',
        awards: user.awards || '',
        bio: user.bio || '',
        facebook_url: user.facebook_url || '',
        linkedin_url: user.linkedin_url || '',
        portfolio_website: user.portfolio_website || '',
      });
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-20 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex flex-col md:flex-row items-center md:items-start md:space-x-6">
          <img
            src={user.profile_picture || '/default-avatar.png'}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-3xl font-bold">{user.first_name} {user.last_name}</h1>
            <p className="mt-1 text-lg font-medium">
              {user.current_job_title || 'Not specified'} {user.company_name && `at ${user.company_name}`}
            </p>
            <p className="mt-1 text-sm md:text-base text-gray-100">
              {user.program} • Batch {user.batch_year}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Number</label>
                <p className="mt-1 text-gray-900">{user.student_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Program</label>
                <p className="mt-1 text-gray-900">{user.program}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Year</label>
                <p className="mt-1 text-gray-900">{user.batch_year}</p>
              </div>
              {user.phone_number && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-gray-900">{user.phone_number}</p>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Professional Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Position</label>
                <p className="mt-1 text-gray-900">{user.current_job_title || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <p className="mt-1 text-gray-900">{user.company_name || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Thesis Title</label>
                <p className="mt-1 text-gray-900">{user.thesis_title || 'Not specified'}</p>
              </div>
              {user.awards && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Awards</label>
                  <p className="mt-1 text-gray-900">{user.awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {user.bio && (
          <div className="p-6 md:px-10 md:pb-10">
            <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">About Me</h2>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}

        {/* Social & Website Links */}
        {(user.facebook_url || user.linkedin_url || user.portfolio_website) && (
          <div className="px-6 md:px-10 pb-6 md:pb-10 flex space-x-4">
            {user.facebook_url && (
              <a href={user.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Facebook
              </a>
            )}
            {user.linkedin_url && (
              <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                LinkedIn
              </a>
            )}
            {user.portfolio_website && (
              <a href={user.portfolio_website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Portfolio
              </a>
            )}
          </div>
        )}

        {/* Edit Button */}
        <div className="px-6 md:px-10 pb-10 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-full text-white font-medium transition-colors ${
              isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
