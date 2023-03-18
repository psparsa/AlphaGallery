import { render, screen } from '@testing-library/react';
import { Card, ButtonProperties } from '.';

const properties: Required<ButtonProperties> = {
  title: 'test',
  imageSrc: '/a-broken-link.png',
  categories: ['cat', 'dark', 'dog'],
  description: 'a short description',
  containerClassName: 'class-name-test',
};
test('checks card contents', () => {
  const { container } = render(<Card {...properties} />);

  expect(container).toHaveTextContent(properties.title);
  for (const categoryName of properties.categories) {
    expect(container).toHaveTextContent(categoryName);
  }
  expect(container).toHaveTextContent(properties.description);
});

test('checks className', () => {
  const { container } = render(<Card {...properties} />);

  const cardElement = container.querySelector(
    `.${properties.containerClassName}`
  );
  expect(cardElement).toHaveClass(properties.containerClassName);
});

test('tests download button', () => {
  render(<Card {...properties} />);

  const downloadButton = screen.getByText('Download');

  expect(downloadButton.closest('a')).toHaveAttribute(
    'href',
    properties.imageSrc
  );
});
