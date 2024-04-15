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

  const firebaseConfig = {
    apiKey: "AIzaSyDGpaPbpF0fV5c-LrK67xIHmqqPqWr_AWg",
    authDomain: "bcp-feedback-app.firebaseapp.com",
    projectId: "bcp-feedback-app",
    storageBucket: "bcp-feedback-app.appspot.com",
    messagingSenderId: "450285576701",
    appId: "1:450285576701:web:46d419255526a6de407994",
    measurementId: "G-KTZG51ET7C"
  };
  
  if(!app.current) app.current = initializeApp(firebaseConfig);

  const {getFeed} = useFirestore();
  const [data, setData] = useState([]);

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
