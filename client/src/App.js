import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestComponent, Preferences, Dashboard, Login } from './components';
import useToken from './hooks/LoginHooks';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
        <Route path="/" element= {<TestComponent/>}/>
          <Route path="/dashboard" element= {<Dashboard/>}/>
          <Route path="/preferences" element= {<Preferences/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
