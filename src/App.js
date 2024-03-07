import './App.css';
import React, { useEffect, useState } from 'react';
import jsonData from './JSON_dumps/Scrape_2024-03-06_14-08-00.json';
import Feed from './components/Feed';
import Header from './components/Header';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  }, []);
  
  return (
    <div className="App">
      <Header/>
      <Feed data = {data}/>
    </div>
  );
}

export default App;
