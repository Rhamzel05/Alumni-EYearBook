// CarListing.jsx

import React from 'react';
import './../css/CarListing.css'; // Assume you'll have a CSS file for styling

/**
 * A reusable component for displaying a single car listing.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.imageUrl - URL of the car image.
 * @param {string} props.carName - Full name of the car (e.g., "2024 Tesla Model S").
 * @param {string} props.stockNumber - Unique stock identifier (e.g., "TSLA007").
 */
const CarListing = ({ imageUrl, carName, stockNumber }) => {
  return (
    <div className="car-listing-card">
      <div className="car-image-container">
        {/* Placeholder image tag - In a real app, use the actual URL */}
        <img 
          src={imageUrl} 
          alt={carName} 
          className="car-image"
        />
        
      </div>
      
      <div className="car-details">
        <h2 className="car-name">{carName}</h2>
        <p className="stock-number">
          <span className="stock-label">Stock #</span> 
          <strong className="stock-value">{stockNumber}</strong>
        </p>
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  );
};

export default CarListing;