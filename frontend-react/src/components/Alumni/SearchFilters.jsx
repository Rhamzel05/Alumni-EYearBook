import React, { useState } from 'react';

const SearchFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    graduationYear: '',
    degree: '',
    company: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchQuery: '',
      graduationYear: '',
      degree: '',
      company: ''
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="search-filters">
      <div className="filter-group">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search by name..."
          value={filters.searchQuery}
          onChange={handleInputChange}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <input
          type="text"
          name="graduationYear"
          placeholder="Graduation Year"
          value={filters.graduationYear}
          onChange={handleInputChange}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={filters.degree}
          onChange={handleInputChange}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={handleInputChange}
          className="filter-input"
        />
      </div>
      
      <button onClick={handleReset} className="reset-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default SearchFilters;