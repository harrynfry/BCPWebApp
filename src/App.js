import './App.css';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import Upload from './components/Upload';
import DataDisplay from './components/DataDisplay';
import useFirestore from './firebase/useFirestore';

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
        const articlesData = await getFeed(); // Call the getFeed function to retrieve articles
        setData(articlesData); // Update the state with the retrieved articles
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles(); // Invoke the fetchArticles function
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="App">
      <Upload data = {data}/>
      <Header/>
      <DataDisplay/>
      <Feed data = {data}/>
    </div>
  );
}

export default App;
