import React from 'react';
import { render, waitFor } from '@testing-library/react';
import KanbanBoard from './KanbanBoard';
import axios from 'axios';

jest.mock('axios');

describe('KanbanBoard component', () => {
  test('renders the component without crashing', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<KanbanBoard />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://a-paint-company-a54db84c4060.herokuapp.com/api/');
    });
  });

  test('displays available paints', async () => {
    const availablePaints = [{ id: 1, name: 'Paint 1', status: 'available' }];

    axios.get.mockResolvedValue({ data: availablePaints });

    const { getByText } = render(<KanbanBoard />);

    await waitFor(() => {
      expect(getByText('AVAILABLE')).toBeInTheDocument();
      expect(getByText('Paint 1')).toBeInTheDocument();
    });
  });
});
