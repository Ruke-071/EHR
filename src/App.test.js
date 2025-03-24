import { render, screen } from '@testing-library/react';
import App from './App';
// import docreg from './docreg';

test('renders learn react link', () => {
  render(<App />);
  // render(<docreg />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
