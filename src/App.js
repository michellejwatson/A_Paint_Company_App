import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if access token exists in local storage
    const token = localStorage.getItem('access_token');
    // If token exists, then set user to logged in
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // Set loggedIn to true when handleLogin() is called 
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Set loggedIn to false when handleLogout() is called 
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
