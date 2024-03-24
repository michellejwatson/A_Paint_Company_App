import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import LoginPage from './LoginPage';

// Mock axios post method
jest.mock('axios');

describe('LoginPage component', () => {
  test('renders login form', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('submits login form with valid credentials', async () => {
    // Mock successful login response
    axios.post.mockResolvedValueOnce({ data: 'access_token' });

    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    // Set username and password values
    fireEvent.change(usernameInput, { target: { value: 'john' } });
    fireEvent.change(passwordInput, { target: { value: 'Ilovepainting3' } });

    // Click on login button
    fireEvent.click(loginButton);

    // Wait for the login process to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/account/login/', {
        username: 'john',
        password: 'Ilovepainting3',
      });
    });
  });

  test('displays error message for invalid credentials', async () => {
    // Mock failed login response
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = render(<LoginPage />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    // Set username and password values
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Click on login button
    fireEvent.click(loginButton);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = getByText('Login failed: Invalid credentials');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
