import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-5xl mx-auto py-12 px-6 flex flex-col items-center">

        {/* TITLE */}
        <h3 className="text-xl font-bold text-white mb-3">
          Alumni E-YearBook
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm text-center max-w-2xl mb-8">
          Connecting Mindoro State University alumni across generations and professions.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex items-center space-x-6 mb-10">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="text-xl text-white hover:text-blue-500 transition">
            <FaFacebookF />
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="text-xl text-white hover:text-blue-400 transition">
            <FaLinkedinIn />
          </a>

          <a href="mailto:info@msu.edu.ph"
             className="text-xl text-white hover:text-red-500 transition">
            <FaEnvelope />
          </a>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className="flex items-center space-x-10 text-sm mb-10">
          <li>
            <Link className="hover:text-white transition" to="/alumni">Alumni Directory</Link>
          </li>
          <li>
            <Link className="hover:text-white transition" to="/news">News & Events</Link>
          </li>
          <li>
            <a className="hover:text-white transition">Contact</a>
          </li>
        </ul>

        {/* CAMPUS INFO */}
        <div className="text-center text-gray-400 text-sm mb-10 leading-5">
          <p>Mindoro State University</p>
          <p>Main Campus</p>
          <p>Oriental Mindoro, Philippines</p>
        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-gray-700 mb-6"></div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-xs text-center">
          © {new Date().getFullYear()} Mindoro State University. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
