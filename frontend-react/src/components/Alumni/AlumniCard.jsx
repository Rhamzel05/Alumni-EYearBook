import React from 'react';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="alumni-card">
      <div className="alumni-avatar">
        {alumni.avatar ? (
          <img src={alumni.avatar} alt={`${alumni.firstName} ${alumni.lastName}`} />
        ) : (
          <div className="avatar-placeholder">
            {alumni.firstName?.charAt(0)}{alumni.lastName?.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="alumni-info">
        <h3>{alumni.firstName} {alumni.lastName}</h3>
        <p className="graduation-year">Class of {alumni.graduationYear}</p>
        <p className="degree">{alumni.degree}</p>
        <p className="current-position">{alumni.currentPosition}</p>
        <p className="company">{alumni.company}</p>
        
        {alumni.email && (
          <p className="email">{alumni.email}</p>
        )}
        
        {alumni.linkedIn && (
          <a href={alumni.linkedIn} target="_blank" rel="noopener noreferrer" className="linkedin-link">
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

export default AlumniCard;