import './App.css';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import jsonData from './JSON_dumps/Scrape_2024-03-06_14-08-00.json';
import Feed from './components/Feed';
import Header from './components/Header';
import Upload from './components/Upload';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  }, []);

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

  return (
    <div className="App">
      <Upload data = {data}/>
      <Header/>
      <Feed data = {data}/>
    </div>
  );
}

export default App;
