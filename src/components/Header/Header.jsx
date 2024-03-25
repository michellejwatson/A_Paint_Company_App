import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png'; 
import axios from 'axios';

const Header = ({ handleLogout }) => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const username = localStorage.getItem('username');

  // Function to handle logout
  const handleSubmit = () => {
    try {
      // Make a request to logout endpoint
      axios.get('https://a-paint-company-a54db84c4060.herokuapp.com/api/account/logout/');
      
      // Clear user session
      localStorage.removeItem('access_token');
      
      // Redirect to the login page
      handleLogout();
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
        <button onClick={handleSubmit}>Logout</button>
      </div>}
    </div>
  );
}

export default Header;