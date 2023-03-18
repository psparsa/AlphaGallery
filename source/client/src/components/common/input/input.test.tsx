import { Input } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('tests changing characters visibility', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Input secret={true} value="123" onChange={console.log} />
  );

  const inputElement = screen.getByDisplayValue('123');
  expect(inputElement).toHaveAttribute('type', 'password');

  const hideShowButton = container.querySelector('#toggle-visibility');
  if (!hideShowButton) throw new Error("toggle button didn't found");

  await user.click(hideShowButton);
  expect(inputElement).toHaveAttribute('type', 'text');
});

test('tests input value', () => {
  const DEFAULT_INPUT_VALUE = '%#!@FDS';
  render(
    <Input secret={true} value={DEFAULT_INPUT_VALUE} onChange={console.log} />
  );

  const inputElement = screen.getByDisplayValue(DEFAULT_INPUT_VALUE);
  expect(inputElement).toHaveAttribute('value', DEFAULT_INPUT_VALUE);
});
