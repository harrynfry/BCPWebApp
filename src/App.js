import './css/App.css';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import DataDisplay from './components/DataDisplay';
import useFirestore from './firebase/useFirestore';
import Footer from './components/Footer';

function App() {

  const app = React.useRef(null);

  // firebase config, .env file 
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
  
  if(!app.current) app.current = initializeApp(firebaseConfig);

  const {getFeed} = useFirestore(); 
  const [data, setData] = useState([]); // set data from firestore in state upon page render

  useEffect(() => {
    // Call the getFeed function when the component mounts
    
    const fetchArticles = async () => {
      try {
        const articlesData = await getFeed(); // Call getFeed function to retrieve articles
        articlesData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Sort articles by date
        setData(articlesData); // Update state with articles
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles(); // Call fetchArticles 
  }, []); // Empty dependency array, effect runs once

  return (
    <div className="App">
      <Header/>
      <DataDisplay/>
      <Feed data = {data}/>
      <Footer/>
    </div>
  );
}

export default App;
