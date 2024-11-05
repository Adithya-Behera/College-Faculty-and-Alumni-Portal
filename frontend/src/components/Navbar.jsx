import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/">Institute Portal</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        
        {/* Dynamic Links for Faculty and Alumni */}
        {location.pathname.startsWith('/faculty') && isAuthenticated ? (
          <Link to="/createFaculty" className="hover:underline">Create Faculty</Link>
        ) : (
          <Link to="/faculty" className="hover:underline">Faculty</Link>
        )}

        {location.pathname.startsWith('/alumni') && isAuthenticated ? (
          <Link to="/createAlumni" className="hover:underline">Create Alumni</Link>
        ) : (
          <Link to="/alumni" className="hover:underline">Alumni</Link>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <Link to="/login" className="hover:underline">Admin Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
