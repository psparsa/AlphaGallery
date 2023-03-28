import { Pagination } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('tests the current page value', async () => {
  const user = userEvent.setup();

  const PAGES_COUNT = 15;
  render(<Pagination pagesCount={PAGES_COUNT} />);

  const getCurrentPageItem = () => screen.getByTestId('current-page-item');
  const previousBTN = screen.getByTestId('prev-button');
  const nextBTN = screen.getByTestId('next-button');

  expect(getCurrentPageItem()).toHaveTextContent('1');
  await user.click(nextBTN);
  await user.click(nextBTN);
  expect(getCurrentPageItem()).toHaveTextContent('3');
  await user.click(previousBTN);
  expect(getCurrentPageItem()).toHaveTextContent('2');
});
