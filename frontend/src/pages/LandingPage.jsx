import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <img src={Logo} alt="College Logo" className="mb-6 w-64" />
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Institute</h1>
            <p className="text-lg mb-8 text-center max-w-md">
                Your gateway to excellence in education, research, and community service. Join us to explore endless opportunities!
            </p>
            <div className="flex space-x-4">
                <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                    Admin Login
                </Link>
                <Link to="/home" className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                    Guest
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
