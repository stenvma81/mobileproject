import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SendMessage } from '../messages/SendMessage'
import { PostForm } from '../posts/PostForm';

export function TestComponent() {
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
       <button onClick={() => {alert()}}>
        Click me
      </button>
      <SendMessage />
      <PostForm />
      </header>
      <div>
      </div>
    </div>
  );
}