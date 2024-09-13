import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders header with navigation links', () => {
  render(<Header />);
  expect(screen.getByText(/menu/i)).toBeInTheDocument();
  expect(screen.getByText(/entrar/i)).toBeInTheDocument();
  expect(screen.getByText(/contato/i)).toBeInTheDocument();
});