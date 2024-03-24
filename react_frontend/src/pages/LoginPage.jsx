import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Alert from '@mui/material/Alert';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/account/login/', {
        username,
        password,
      });
      // set token in local storage 
      localStorage.setItem('access_token', response.data);
      localStorage.setItem('username', username);

      // Redirect to main page on successful login
      navigate(0);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Display incorrect username or password error message
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      {showError && 
        <div style={{margin: '1rem'}}>
            <Alert severity="error">Incorrect Username or Password.</Alert>
        </div>
      }
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
