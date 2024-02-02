// src/LoginPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../src/components/auth';
import '../src/css/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Navigate to the home page upon successful login
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Auth onAuthSuccess={handleLoginSuccess} />
        {/* Link to the register page */}
        <p>
          <Link to="/register">Don't have an account? Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
