// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5nAoqfhsOKEqX97u0jZYNNRPGy9j5huc",
  authDomain: "proiect-react-d5ed1.firebaseapp.com",
  databaseURL: "https://proiect-react-d5ed1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "proiect-react-d5ed1",
  storageBucket: "proiect-react-d5ed1.appspot.com",
  messagingSenderId: "649131078491",
  appId: "1:649131078491:web:d04e21ca0ee8e0b0fb207e",
  measurementId: "G-2G4X48WYRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);