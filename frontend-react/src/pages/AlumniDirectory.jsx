import React, { useState, useEffect } from "react";
import axios from "axios";
import AlumniCard from "../components/Alumni/AlumniCard";
import SearchFilters from "../components/Alumni/SearchFilters";

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get("/api/alumni");
      setAlumni(response.data);
      setFilteredAlumni(response.data);
    } catch (err) {
      setError("Failed to fetch alumni data");
      console.error("Error fetching alumni:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    let filtered = alumni;

    if (filters.searchQuery) {
      filtered = filtered.filter(alum =>
        `${alum.firstName} ${alum.lastName}`
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.graduationYear) {
      filtered = filtered.filter(alum =>
        alum.graduationYear.toString().includes(filters.graduationYear)
      );
    }

    if (filters.degree) {
      filtered = filtered.filter(alum =>
        alum.degree?.toLowerCase().includes(filters.degree.toLowerCase())
      );
    }

    if (filters.company) {
      filtered = filtered.filter(alum =>
        alum.company?.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    setFilteredAlumni(filtered);
  };

  if (loading) return <div className="loading">Loading alumni directory...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="alumni-directory">
      <h1>Alumni Directory</h1>
      
      <SearchFilters onFilter={handleFilter} />
      
      <div className="alumni-count">
        Showing {filteredAlumni.length} of {alumni.length} alumni
      </div>
      
      <div className="alumni-grid">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map(alum => (
            <AlumniCard key={alum.id} alumni={alum} />
          ))
        ) : (
          <div className="no-results">
            No alumni found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;