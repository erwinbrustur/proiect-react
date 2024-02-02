import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './config/firebase'; // Import Firebase authentication
import './css/UserInformation.css';

const UserInformation = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    position: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser; // Get the current user
      const userInfoData = {
        ...formData,
        email: currentUser.email // Include the user's email in the form data
      };
      const docRef = await addDoc(collection(db, 'userInfo'), userInfoData);
      console.log('Document written with ID: ', docRef.id);
      setFormData({
        phoneNumber: '',
        position: '',
        department: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="form-container">
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Position:
          <input type="text" name="position" value={formData.position} onChange={handleChange} />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInformation;
