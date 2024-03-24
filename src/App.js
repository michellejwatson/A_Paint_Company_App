import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import KanbanBoard from './components/KanbanBoard';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if access token exists in local storage
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Update isLoggedIn state if access token is found
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
