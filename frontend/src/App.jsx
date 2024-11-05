import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';
import CreateFacultyPage from './pages/CreateFacultyPage';
import UpdateFacultyPage from './pages/UpdateFacultyPage';
import FacultyDetailPage from './pages/FacultyDetailPage';

import AlumniPage from './pages/AlumniPage';
import AlumniDetailPage from './pages/AlumniDetailPage';
import CreateAlumniPage from './pages/CreateAlumniPage';
import UpdateAlumniPage from './pages/UpdateAlumniPage';

import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Adjust based on your auth slice

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/faculty/:id" element={<FacultyDetailPage />} />
          <Route path="/createFaculty" element={<CreateFacultyPage />} />
          <Route path="/updateFaculty/:id" element={<UpdateFacultyPage />} />

          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/alumni/:id" element={<AlumniDetailPage />} />
          <Route path="/createAlumni" element={<CreateAlumniPage />} />
          <Route path="/updateAlumni/:id" element={<UpdateAlumniPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
