import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, writeBatch, getDoc, runTransaction } from "firebase/firestore";

import jsonData from './JSON_dumps/Scrape_2024-03-06_14-08-00.json';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGpaPbpF0fV5c-LrK67xIHmqqPqWr_AWg",
  authDomain: "bcp-feedback-app.firebaseapp.com",
  projectId: "bcp-feedback-app",
  storageBucket: "bcp-feedback-app.appspot.com",
  messagingSenderId: "450285576701",
  appId: "1:450285576701:web:46d419255526a6de407994",
  measurementId: "G-KTZG51ET7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
