// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../src/css/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/home' || location.pathname === '/leave-request' || location.pathname === '/user-information' || location.pathname === '/timesheet'
              || location.pathname === '/payroll';

  if (!showNavbar) {
    return null; // Do not render Navbar on other pages
  }

  return (
    <div className="navbar">
      <Link to="/">Login</Link>
      <span className="right-side"> 
        <Link to="/home">Home</Link>
        <Link to="/leave-request">Leave Request</Link>
        <Link to="/user-information">User Information</Link> {/* Link to the Admin page */}
        <Link to="/timesheet">Timesheet</Link>
        <Link to="/payroll">Payroll</Link> 
      </span>
    </div>
  );
};

export default Navbar;
