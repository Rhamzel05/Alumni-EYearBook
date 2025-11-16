import React from 'react';
import { useParams } from 'react-router-dom';

const AlumniProfile = () => {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Profile</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600">Viewing alumni profile ID: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;