import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { usePosts } from '../../hooks/ApiHooks';
import { SendMessage } from '../messages/SendMessage'

const dormData = {
  userid: 2, description: null, type: 1, title: null, location: null, state: 2
};

const formData = {
  userid: 2, description: null, type: 1, title: null, location: null, state: 2
};

const updateData = {
  description: null, type: 1, title: null, location: null, state: 2
};

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
  const { loadSinglePost, uploadPost, closePost, modifyPost, loadPostByUserId } = usePosts();

  return (
    <div className="App">
      <header className="App-header">
        <div>
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
       <button onClick={() => {loadPostByUserId(2)}}>
        Click me
      </button>
      <SendMessage />
      </header>
    </div>
  );
}