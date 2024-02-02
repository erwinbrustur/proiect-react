import React, { useState } from 'react';
import './css/Payroll.css';

const PayrollPage = () => {
  const [grossSalary, setGrossSalary] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [deductions, setDeductions] = useState({
    tax: 0,
    socialSecurity: 0,
    healthInsurance: 0,
  });

  const calculateNetSalary = () => {
    const tax = 0.1 * grossSalary;
    const socialSecurity = 0.25 * grossSalary;
    const healthInsurance = 0.1 * grossSalary;
    const mealTickets = 600 

    const totalDeductions = tax + socialSecurity + healthInsurance;
    const netSalary = grossSalary - totalDeductions + mealTickets;

    setNetSalary(netSalary);
    setDeductions({ tax, socialSecurity, healthInsurance });
  };

  const handleCalculate = () => {
    calculateNetSalary();
  };

  return (
    <div className="payroll-container">
      <h2>Payroll</h2>
      <div className="form-group">
        <label htmlFor="grossSalary">Gross Salary (RON):</label>
        <input
          type="number"
          id="grossSalary"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {netSalary !== '' && (
        <div>
          <h3>Meal Tickets: 600 RON</h3>
          <h3>Net Salary: {netSalary} RON</h3>          
          <h3>Deductions:</h3>
          <ul>
            <li>Tax: {deductions.tax} RON</li>
            <li>Social Security: {deductions.socialSecurity} RON</li>
            <li>Health Insurance: {deductions.healthInsurance} RON</li>
          </ul>
          
        </div>
      )}
      <h3>Benefits:</h3>
      <ul>
            <li>Gym Membership: <a href="https://7card.ro/" target="_blank" rel="noopener noreferrer">7card</a></li>
            <li>Bookster Subscription: <a href="https://landing.bookster.ro/" target="_blank" rel="noopener noreferrer">Bookster</a></li>
            </ul>
    </div>
  );
};

export default PayrollPage;
