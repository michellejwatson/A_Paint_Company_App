import React from 'react';
import './Navigation.css'; // Import CSS file for styling
import logo from '../../assets/logo.png'; 

const Navigation = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="company-logo" />
        <h1>A Paint Company</h1>
      </div>
      <div className="header__right" style={{paddingRight: '20px'}}>
        <button>Login</button>
      </div>
    </div>
  );
}

export default Navigation;