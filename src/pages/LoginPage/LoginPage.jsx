import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import Alert from '@mui/material/Alert';

function LoginPage( { handleLogin } ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send post request with login credentials using axios
      const response = await axios.post('https://a-paint-company-a54db84c4060.herokuapp.com/api/account/login/', {
        username,
        password,
      });
      const { token, user_groups } = response.data;

      // Set token, user groups, and username in local storage 
      localStorage.setItem('access_token', token);
      localStorage.setItem('user_groups', JSON.stringify(user_groups));
      localStorage.setItem('username', username);

      // Use handleLogin() to redirect to main page on successful login
      handleLogin();
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
