import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

test('checks button value', async () => {
  const LABEL = 'CLICK ON ME';
  render(<Button>{LABEL}</Button>);

  const buttonElement = await screen.findByText(LABEL);
  expect(buttonElement).toHaveTextContent(LABEL);
});

test('checks className value', async () => {
  const LABEL = 'CLICK ON ME';
  const containerClassName = 'test-class';
  render(<Button containerClassName={containerClassName}>{LABEL}</Button>);

  const buttonElement = await screen.findByText(LABEL);
  expect(buttonElement).toHaveClass(containerClassName);
});

const addTagPToDom = (content: string) => {
  const element = document.createElement('p');
  Reflect.set(element, 'innerHTML', content);
  document.body.append(element);
};
test('tests onClick event', async () => {
  const user = userEvent.setup();
  const content = 'GfFbF%@^';
  render(
    <Button onClick={() => addTagPToDom(content)}>Add a P tag to DOM</Button>
  );

  const buttonElement = await screen.findByRole('button');
  await user.click(buttonElement);

  const tagP = await screen.findByText(content);
  expect(tagP).toHaveTextContent(content);
});
