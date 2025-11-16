import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="text-4xl font-bold mb-4">Mindoro State University</h1>
        <h2 className="text-2xl font-semibold mb-6">Alumni E-YearBook System</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect with fellow alumni, rediscover old friends, and stay updated with university news and events.
        </p>
        
        {!user ? (
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-3 text-lg">
              Join Now
            </Link>
            <Link to="/alumni" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-gray-100">
              Browse Alumni
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link to="/alumni" className="btn-primary px-8 py-3 text-lg">
              Explore Directory
            </Link>
            <Link to="/profile" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-gray-100">
              My Profile
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center p-6">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Alumni Directory</h3>
          <p className="text-gray-600">
            Search and connect with fellow alumni across different batches and programs.
          </p>
        </div>

        <div className="card text-center p-6">
          <div className="text-4xl mb-4">💼</div>
          <h3 className="text-xl font-semibold mb-2">Career Network</h3>
          <p className="text-gray-600">
            Discover job opportunities and connect with alumni in your industry.
          </p>
        </div>

        <div className="card text-center p-6">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">Events & Reunions</h3>
          <p className="text-gray-600">
            Stay updated with university events, reunions, and alumni gatherings.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;