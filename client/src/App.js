import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestComponent, Preferences, Dashboard, Login } from './components';

/*
function App() {
  return (
    <div className="App">
      <TestComponent />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React to be a king
        </a>
      </header>
    </div>
  );
}
*/

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element= {<Dashboard/>}/>
          <Route path="/preferences" element= {<Preferences/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
