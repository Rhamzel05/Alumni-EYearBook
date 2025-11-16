import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
// TINANGGAL: import Footer mula dito

// Define paths where the Navbar should NOT appear
const excludedPaths = ['/login', '/register'];

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current route path is in the exclusion list
  const showNavAndFooter = !excludedPaths.includes(location.pathname);

  // FIX: Conditional padding class. 
  const mainPadding = showNavAndFooter ? 'pt-16' : '';

  return (
    // Inalis ang min-h-screen/flex-col para maging fluid ang layout.
    <div className="bg-gray-50">
      
      {/* Conditionally render the Navbar */}
      {showNavAndFooter && <Navbar />} 
      
      {/* Ikinabit ang padding para hindi matabunan ng fixed Navbar ang content. */}
      <main className={`min-h-screen ${mainPadding}`}>
        {children}
      </main>
      
      {/* TINANGGAL: Footer component dito */}
    </div>
  );
};

export default Layout;