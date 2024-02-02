// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import LeaveRequestPage from './LeaveRequestPage';
import UserInformation from './UserInformation';
import Timesheet from './Timesheet';
import Payroll from './Payroll';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/leave-request" element={<LeaveRequestPage />} />
        <Route path="/user-information" element={<UserInformation />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path='/payroll' element={<Payroll />} />
      </Routes>
    </Router>
  );
};

export default App;
