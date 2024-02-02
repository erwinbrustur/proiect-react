import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './config/firebase';
import './css/Timesheet.css';

const TimesheetsPage = () => {
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [timesheets, setTimesheets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTimesheets = async () => {
      const timesheetsCollection = collection(db, 'timesheets');
      const q = query(timesheetsCollection, where('date', '==', date));
      const snapshot = await getDocs(q);
      const timesheetsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimesheets(timesheetsData);
    };

    fetchTimesheets();
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(hours) > 8) {
      setMessage('Maximum hours allowed is 8.');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'timesheets'), {
        hours: parseInt(hours),
        date,
        details,
        timestamp: new Date(),
      });
      setMessage('Timesheet entry submitted successfully!');
      setTimesheets([
        ...timesheets,
        {
          id: docRef.id,
          hours: parseInt(hours),
          date,
          details,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="timesheets-container">
      <h2>Timesheets</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours Worked:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <div className="timesheets-list">
        <h3>Timesheets for {date}</h3>
        <ul>
          {timesheets.map((timesheet) => (
            <li key={timesheet.id}>
              Date: {timesheet.date}, Hours: {timesheet.hours}, Details: {timesheet.details}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimesheetsPage;
