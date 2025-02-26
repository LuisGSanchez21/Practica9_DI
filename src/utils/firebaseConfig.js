
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };
