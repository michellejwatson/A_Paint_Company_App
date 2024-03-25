import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import axios from 'axios';

jest.mock('axios');

describe('Header component', () => {
  test('renders the component without crashing', () => {
    render(<Header />);
  });

  test('displays logo and company name', () => {
    const { getByAltText, getByText } = render(<Header />);
    const logoElement = getByAltText('Logo');
    const companyNameElement = getByText('A Paint Company');

    expect(logoElement).toBeInTheDocument();
    expect(companyNameElement).toBeInTheDocument();
  });

  test('displays username and logout button when user is logged in', () => {
    localStorage.setItem('access_token', 'fakeAccessToken');
    localStorage.setItem('username', 'testuser');

    const { getByText } = render(<Header />);
    const usernameElement = getByText('Hi testuser!');
    const logoutButton = getByText('Logout');

    expect(usernameElement).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('handles logout when logout button is clicked', async () => {
    localStorage.setItem('access_token', 'fakeAccessToken');
    const handleLogout = jest.fn();

    axios.get.mockResolvedValueOnce({ data: { message: 'Logout successful' } });

    const { getByText } = render(<Header handleLogout={handleLogout} />);
    const logoutButton = getByText('Logout');

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://a-paint-company-a54db84c4060.herokuapp.com/api/account/logout/');
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(handleLogout).toHaveBeenCalledTimes(1);
    });
  });
});
