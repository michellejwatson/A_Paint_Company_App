import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PaintCard from './PaintCard';
import axios from 'axios';

jest.mock('axios');

describe('PaintCard component', () => {
  const paint = {
    colour: 'Blue',
    inventory: 10,
  };

  test('renders the component without crashing', () => {
    render(<PaintCard paint={paint} index={0} />);
  });

  test('displays paint colour and inventory input', () => {
    const { getByText, getByDisplayValue } = render(<PaintCard paint={paint} index={0} />);
    const colourElement = getByText('Blue');
    const inventoryInput = getByDisplayValue('10');

    expect(colourElement).toBeInTheDocument();
    expect(inventoryInput).toBeInTheDocument();
  });

  test('updates inventory when input value changes', async () => {
    const { getByDisplayValue } = render(<PaintCard paint={paint} index={0} />);
    const inventoryInput = getByDisplayValue('10');

    fireEvent.change(inventoryInput, { target: { value: '20' } });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://a-paint-company-a54db84c4060.herokuapp.com/api/post/Blue/', {
        inventory: '20',
      });
    });
  });
});
