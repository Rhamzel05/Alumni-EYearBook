import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_number: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    college_department: '',
    program: '',
    batch_year: new Date().getFullYear(),
    section: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password match
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'College of Arts and Sciences',
    'College of Business and Accountancy',
    'College of Education',
    'College of Engineering',
    'College of Information Technology',
    'College of Nursing',
    'College of Agriculture'
  ];

  const programs = [
    'Bachelor of Science in Computer Science',
    'Bachelor of Science in Information Technology',
    'Bachelor of Science in Business Administration',
    'Bachelor of Elementary Education',
    'Bachelor of Secondary Education',
    'Bachelor of Science in Civil Engineering',
    'Bachelor of Science in Nursing'
  ];

  return (
    <div className="flex justify-center bg-gray-50 py-12">
      <div className="max-w-sm space-y-8 bg-white p-6 shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your alumni account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the Mindoro State University alumni community
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Student Number */}
          <div>
            <label htmlFor="student_number" className="block text-sm font-medium text-gray-700">
              Student Number *
            </label>
            <input
              id="student_number"
              name="student_number"
              type="text"
              required
              value={formData.student_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Batch Year */}
          <div>
            <label htmlFor="batch_year" className="block text-sm font-medium text-gray-700">
              Batch Year *
            </label>
            <input
              id="batch_year"
              name="batch_year"
              type="number"
              required
              value={formData.batch_year}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Name Fields */}
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              id="middle_name"
              name="middle_name"
              type="text"
              value={formData.middle_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Department & Program */}
          <div>
            <label htmlFor="college_department" className="block text-sm font-medium text-gray-700">
              College Department *
            </label>
            <select
              id="college_department"
              name="college_department"
              required
              value={formData.college_department}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700">
              Program *
            </label>
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Program</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">
              Section
            </label>
            <input
              id="section"
              name="section"
              type="text"
              value={formData.section}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Passwords */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
              Confirm Password *
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                         text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                         disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
