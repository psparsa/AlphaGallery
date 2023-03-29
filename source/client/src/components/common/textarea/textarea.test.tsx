import { Textarea } from '.';
import { fireEvent, render, screen } from '@testing-library/react';

test('tests the character counter', () => {
  const MAX_LENGTH = 100;
  const PLACEHOLDER = 'a dummy placeholder';
  render(<Textarea maxLength={MAX_LENGTH} placeHolder={PLACEHOLDER} />);

  const characterCounter = screen.getByTestId('character-counter');
  const inputElement = screen.getByPlaceholderText(PLACEHOLDER);

  expect(characterCounter).toHaveTextContent(`0/${MAX_LENGTH}`);

  const INPUT_VALUE = 'ABC 4444 09!@#%#';

  fireEvent.change(inputElement, { target: { value: INPUT_VALUE } });

  expect(characterCounter).toHaveTextContent(
    `${INPUT_VALUE.length}/${MAX_LENGTH}`
  );
});

test('tests the existence of placeholder', () => {
  const PLACEHOLDER = 'a dummy placeholder';
  render(<Textarea placeHolder={PLACEHOLDER} />);

  const inputElement = screen.getByPlaceholderText(PLACEHOLDER);

  expect(inputElement).toBeInTheDocument();
});
