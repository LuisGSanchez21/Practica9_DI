// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 
import { getAnalytics } from "firebase/analytics"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUcx16idS-4qoFhcqXTzgyAFwO2A6eKd8",
  authDomain: "p9luisgil.firebaseapp.com",
  databaseURL: "https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "p9luisgil",
  storageBucket: "p9luisgil.firebasestorage.app",
  messagingSenderId: "370738384897",
  appId: "1:370738384897:web:8aaab61e5e2dd5cae3f000",
  measurementId: "G-7T1F3RV021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication and Realtime Database
const auth = getAuth(app); // Firebase Authentication
const db = getDatabase(app); // Realtime Database
const analytics = getAnalytics(app); // Firebase Analytics

// Export Firebase services to use them in other files
export { auth, db, analytics };
