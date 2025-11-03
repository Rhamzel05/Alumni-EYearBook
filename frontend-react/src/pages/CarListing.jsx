// App.js

import React from 'react';
import CarListing from './CarListing';
// Assuming you have a default image for the example
import teslaImage from './assets/tesla-model-s.jpg'; 

function Cars() {
  const exampleCarData = {
    imageUrl: 'https://example.com/images/tesla-model-s.jpg', 
    carName: '2024 Tesla Model S Plaid',
    stockNumber: 'TSLA007',
  };

  return (
    <div className="car-listings-page">
      <h1>Featured Inventory</h1>
      
      {/* Renders the car listing with the required data */}
      <CarListing 
        imageUrl={exampleCarData.imageUrl}
        carName={exampleCarData.carName}
        stockNumber={exampleCarData.stockNumber}
      />
      
    </div>
  );
}

export default Cars;