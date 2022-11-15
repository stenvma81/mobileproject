import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function callServer() {
  console.log("Token: ", sessionStorage.getItem('token'));
  axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/test`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    params: {
      table: 'sample',
    },
  }).then((response) => {
    console.log(response.data);
  });
}

/*
function App() {
  return (
    <div className="App">
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

export function TestComponent() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        This is not a sample component
        {callServer()}
        </div>
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