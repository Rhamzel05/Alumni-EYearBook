import React from 'react';
import { Link } from 'react-router-dom';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="alumni-card">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <img
            src={alumni.profile_picture || '/default-avatar.png'}
            alt={`${alumni.first_name} ${alumni.last_name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {alumni.first_name} {alumni.last_name}
            </h3>
            <p className="text-gray-600 text-sm">
              {alumni.current_job_title} {alumni.company_name && `at ${alumni.company_name}`}
            </p>
            <p className="text-gray-500 text-sm">
              Batch {alumni.batch_year} • {alumni.program}
            </p>
          </div>
        </div>
        
        {alumni.bio && (
          <p className="mt-4 text-gray-700 text-sm line-clamp-2">
            {alumni.bio}
          </p>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            {alumni.linkedin_url && (
              <a href={alumni.linkedin_url} target="_blank" rel="noopener noreferrer">
                <span className="text-blue-600 hover:text-blue-800">LinkedIn</span>
              </a>
            )}
            {alumni.facebook_url && (
              <a href={alumni.facebook_url} target="_blank" rel="noopener noreferrer">
                <span className="text-blue-600 hover:text-blue-800">Facebook</span>
              </a>
            )}
          </div>
          <Link
            to={`/alumni/${alumni.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;