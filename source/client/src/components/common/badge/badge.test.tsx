import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

test('Renders Badge', async () => {
  const LABEL = 'CaTiSH3Re!!!';
  render(<Badge label={LABEL} />);

  const badgeElement = await screen.findByText(LABEL);

  expect(badgeElement).toHaveTextContent(LABEL);
});
