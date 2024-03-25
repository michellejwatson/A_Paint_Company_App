import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  // Check if access token exists in local storage
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header handleLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={loggedIn ? <MainPage /> : <Navigate to="/login" />}/>
            <Route path="/login" element={!loggedIn ? <LoginPage handleLogin={handleLogin} /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
