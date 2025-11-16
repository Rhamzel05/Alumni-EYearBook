import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './Pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AlumniDirectory from './Pages/AlumniDirectory';
import AlumniProfile from './Pages/AlumniProfile';
import MyProfile from './Pages/MyProfile';
import Messages from './Pages/Messages';
import News from './Pages/News';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />

          {/* FIX: Center all page contents */}
          <main className="flex-grow w-full">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/alumni" element={<AlumniDirectory />} />
                <Route path="/alumni/:id" element={<AlumniProfile />} />
                <Route path="/news" element={<News />} />

                {/* Protected Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                } />

                <Route path="/messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />

                {/* Admin */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
