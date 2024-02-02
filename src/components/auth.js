// src/components/auth.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';

export const Auth = ({ onAuthSuccess, isRegistration = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      setError(null); // Clear any previous errors
      let userInfo = null;

      if (isRegistration) {
        // Registration
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Extract information from the email
        const [firstName, lastName] = email.split('@')[0].split('.');

        // Create user info object
        userInfo = {
          firstName,
          lastName,
          userName: `${firstName}.${lastName}`,
          email: user.email, // Include the email in userInfo
        };

        // Set user info in the Firestore collection
        const db = getFirestore();
        const usersCollection = collection(db, 'userInfo');
        await addDoc(usersCollection, userInfo);
      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Retrieve user info from the database if needed
      }

      // If login or registration is successful, call the onAuthSuccess callback
      if (onAuthSuccess) {
        onAuthSuccess(userInfo); // Pass user info to the callback
      }
    } catch (error) {
      console.error('Authentication failed:', error.message);
      setError('Wrong credentials. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistration && (
        <button onClick={handleAuth}>Register</button>
      )}
      {!isRegistration && (
        <button onClick={handleAuth}>Login</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
