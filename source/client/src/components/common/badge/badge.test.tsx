import { render, screen } from '@testing-library/react';
import { Badge } from '.';

test('checks badge label', async () => {
  const LABEL = 'CaTiSH3Re!!!';
  render(<Badge label={LABEL} />);

  const badgeElement = await screen.findByText(LABEL);

  expect(badgeElement).toHaveTextContent(LABEL);
});
