import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    // FIX 1: Nagdagdag ng fixed, top-0, left-0, right-0, z-30, at shadow-md
    // Ginawa ring bg-white ang background para hindi maging transparent.
    <nav className="navbar fixed top-0 left-0 right-0 z-30 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full mr-2"></div>
              <span className="text-xl font-bold text-gray-800">
                Alumni E-YearBook
              </span>
            </Link>
          </div>

          {/* All Links - Now always visible and in the main bar */}
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              Home
            </Link>
            <Link to="/alumni" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              Alumni Directory
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              News & Events
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  My Profile
                </Link>
                <Link to="/messages" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Messages
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                >
                  Logout
                </button>
                <img
                  src={user.profile_picture || '/default-avatar.png'}
                  alt={user.first_name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* The mobile menu button and mobile menu section have been removed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;