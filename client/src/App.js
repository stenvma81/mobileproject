import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestComponent, Preferences, Dashboard, Login, UserMainView } from './components';
import useToken from './hooks/LoginHooks';
import { MainView } from './components/main/MainView';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
        <Route path="/" element= {<UserMainView/>}/>
          <Route path="/dashboard" element= {<Dashboard/>}/>
          <Route path="/preferences" element= {<Preferences/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
