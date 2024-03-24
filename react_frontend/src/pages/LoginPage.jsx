import React, { useState } from 'react';
import axios from 'axios';
import { Route, Navigate, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsLoggedIn(true);
      navigate(0);
      navigate(`/`);
    } catch (error) {
      console.error('Login failed:', error);
      // Display incorrect username or password error message
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
  );
}

export default LoginPage;