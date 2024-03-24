import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png'; 
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    try {
      // Make a request to logout endpoint
      axios.get('http://localhost:8000/api/account/logout/');
      
      // Clear user session
      localStorage.removeItem('access_token');
      
      // Redirect to the login page
      navigate(0);
      navigate('/login'); // Use navigate function to redirect
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="company-logo" />
        <h1>A Paint Company</h1>
      </div>
      {isLoggedIn && <div className="header__right">
        <h4>Hi {username}!</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>}
    </div>
  );
}

export default Header;