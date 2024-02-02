// src/RegisterPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../src/components/auth';
import '../src/css/Register.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    // Navigate to the home page upon successful registration
    navigate('/home');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Auth onAuthSuccess={handleRegisterSuccess} isRegistration />
        {/* Link to the login page */}
        <p>
           <Link to="/">Already have an account? Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
