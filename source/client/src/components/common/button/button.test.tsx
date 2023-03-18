import { render, screen } from '@testing-library/react';
import { Button } from '.';

test('Renders Button', async () => {
  const LABEL = 'CLICK ON ME';
  render(<Button>{LABEL}</Button>);

  const buttonElement = await screen.findByText(LABEL);
  expect(buttonElement).toHaveTextContent(LABEL);
});
