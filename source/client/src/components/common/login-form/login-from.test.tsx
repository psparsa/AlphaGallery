import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '.';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return,unicorn/prefer-module
jest.mock('next/router', () => require('next-router-mock'));
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouterProvider>
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </MemoryRouterProvider>
);
test('LOGIN: tests form validation', async () => {
  const { container } = render(<LoginForm />, { wrapper: Wrapper });

  const inputs = {
    username: screen.getByPlaceholderText('Enter your username'),
    password: screen.getByPlaceholderText('Enter your password'),
  };

  const submitBTNContainer = screen.getByTestId('login-button');
  const submitBTN = submitBTNContainer.querySelector('button');

  fireEvent.change(inputs.username, { target: { value: 'ABC' } });
  fireEvent.change(inputs.password, { target: { value: '1234' } });

  fireEvent.change(inputs.username, { target: { value: '' } });
  fireEvent.change(inputs.password, { target: { value: '' } });

  await waitFor(() => {
    expect(submitBTN).toBeInTheDocument();
    expect(submitBTN).toHaveAttribute('disabled', '');
    expect(container).toHaveTextContent('Password is required');
    expect(container).toHaveTextContent('Username is required');
  });

  fireEvent.change(inputs.username, { target: { value: 'ABC' } });
  fireEvent.change(inputs.password, { target: { value: '1234' } });

  await waitFor(() => {
    expect(submitBTN).toBeInTheDocument();
    expect(submitBTN).not.toHaveAttribute('disabled', '');
    expect(container).not.toHaveTextContent('Password is required');
    expect(container).not.toHaveTextContent('Username is required');
  });
});

test('REGISTER: tests invalid email', async () => {
  const { container } = render(<LoginForm />, { wrapper: Wrapper });

  fireEvent.click(screen.getByText('Register a new account'));

  fireEvent.change(screen.getByPlaceholderText('Enter your Email'), {
    target: { value: 'invalid-email.org' },
  });

  const registerBTNContainer = screen.getByTestId('register-button');
  const registerBTN = registerBTNContainer.querySelector('button');

  await waitFor(() => {
    expect(registerBTN).toHaveAttribute('disabled', '');
    expect(container).toHaveTextContent('Enter a valid email');
  });
});

test('REGISTER: tests password quality', async () => {
  const { container } = render(<LoginForm />, { wrapper: Wrapper });

  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: '123' },
  });
  await waitFor(() =>
    expect(container).toHaveTextContent(
      'Password must be at least 6 characters'
    )
  );

  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: '123456' },
  });
  await waitFor(() =>
    expect(container).not.toHaveTextContent(
      'Password must be at least 6 characters'
    )
  );

  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: 'x'.repeat(500) },
  });
  await waitFor(() =>
    expect(container).toHaveTextContent('Password is too long!')
  );
});

test('REGISTER: tests required inputs', async () => {
  const { container } = render(<LoginForm />, { wrapper: Wrapper });

  const inputs = {
    email: screen.getByPlaceholderText('Enter your Email'),
    username: screen.getByPlaceholderText('Enter your username'),
    password: screen.getByPlaceholderText('Enter your password'),
  };

  const registerBTNContainer = screen.getByTestId('register-button');
  const registerBTN = registerBTNContainer.querySelector('button');

  fireEvent.change(inputs.email, { target: { value: 'test@gmail.com' } });
  fireEvent.change(inputs.username, { target: { value: 'ABC' } });
  fireEvent.change(inputs.password, { target: { value: '123456' } });

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/login?register=true');
    expect(registerBTN).toBeInTheDocument();
    expect(registerBTN).not.toHaveAttribute('disabled', '');
  });

  fireEvent.change(inputs.email, { target: { value: '' } });
  fireEvent.change(inputs.username, { target: { value: '' } });
  fireEvent.change(inputs.password, { target: { value: '' } });

  await waitFor(() => {
    expect(registerBTN).toHaveAttribute('disabled', '');
    expect(container).toHaveTextContent('Email is required');
    expect(container).toHaveTextContent('Username is required');
    expect(container).toHaveTextContent(
      'Password must be at least 6 characters'
    );
  });
});
