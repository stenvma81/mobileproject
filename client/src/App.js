import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Preferences, Dashboard, Login, UserMainView } from './components';
import { useToken } from './hooks/LoginHooks';
import { MainProvider } from './context/MainContext';
import { ContentView } from './components/ContentView';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainProvider>
              {/* <UserMainView /> */}
              <ContentView />
            </MainProvider>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
