import { render, screen } from '@testing-library/react';
import Home from '..src/app/page';

it('renders dashboard title', () => {
  render(<Home />);
  expect(screen.getByText('Task Dashboard')).toBeInTheDocument();
});
