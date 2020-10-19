import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../header';
// import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Hello world</h1>
      </div>
    </Router>
  );
}

export default App;
