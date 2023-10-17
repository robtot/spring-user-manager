import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders users header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Users/i);
  expect(linkElement).toBeInTheDocument();
});
