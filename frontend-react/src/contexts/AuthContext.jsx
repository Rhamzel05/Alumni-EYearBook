import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Create axios instance with baseURL
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'Content-Type': 'application/json' },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register user
  const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      const { user, access_token } = response.data;

      localStorage.setItem('token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);

      return user;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      throw error;
    }
  };

  // ✅ Login user
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { user, access_token } = response.data;

      localStorage.setItem('token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);

      return user;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      throw error;
    }
  };

  // ✅ Logout user
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error);
    } finally {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const value = {
    user,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
