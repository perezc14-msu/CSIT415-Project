// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCem2lEn_s3viS6wZ9h-SoY_M6104UwnQ",
  authDomain: "jobflow-291fc.firebaseapp.com",
  projectId: "jobflow-291fc",
  storageBucket: "jobflow-291fc.firebasestorage.app",
  messagingSenderId: "54701827409",
  appId: "1:54701827409:web:d1ff3452deb8b4f0a19f70",
  measurementId: "G-B9G2ZBG86S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export db for use in other files