import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { usePosts } from '../../hooks/ApiHooks';


function GetPosts() {
  const { loadPosts } = usePosts();
  loadPosts();
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
          {GetPosts()}
        This is not a sample component
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