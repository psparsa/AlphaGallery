import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
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

  act(() => {
    fireEvent.change(inputs.username, { target: { value: 'ABC' } });
    fireEvent.change(inputs.password, { target: { value: '1234' } });

    fireEvent.change(inputs.username, { target: { value: '' } });
    fireEvent.change(inputs.password, { target: { value: '' } });
  });

  await waitFor(() => {
    expect(submitBTN).toBeInTheDocument();
    expect(submitBTN).toHaveAttribute('disabled', '');
    expect(container).toHaveTextContent('Password is required');
    expect(container).toHaveTextContent('Username is required');
  });

  act(() => {
    fireEvent.change(inputs.username, { target: { value: 'ABC' } });
    fireEvent.change(inputs.password, { target: { value: '1234' } });
  });

  await waitFor(() => {
    expect(submitBTN).toBeInTheDocument();
    expect(submitBTN).not.toHaveAttribute('disabled', '');
    expect(container).not.toHaveTextContent('Password is required');
    expect(container).not.toHaveTextContent('Username is required');
  });
});

test('REGISTER: tests form validation', async () => {
  const { container } = render(<LoginForm />, { wrapper: Wrapper });

  act(() => {
    fireEvent.click(screen.getByText('Register a new account'));
  });

  const inputs = {
    email: screen.getByPlaceholderText('Enter your Email'),
    username: screen.getByPlaceholderText('Enter your username'),
    password: screen.getByPlaceholderText('Enter your password'),
  };

  const registerBTNContainer = screen.getByTestId('register-button');
  const registerBTN = registerBTNContainer.querySelector('button');

  act(() => {
    fireEvent.change(inputs.email, { target: { value: 'test@gmail.com' } });
    fireEvent.change(inputs.username, { target: { value: 'ABC' } });
    fireEvent.change(inputs.password, { target: { value: '123456' } });
  });

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/login?register=true');
    expect(registerBTN).toBeInTheDocument();
    expect(registerBTN).not.toHaveAttribute('disabled', '');
  });

  act(() => {
    fireEvent.change(inputs.email, { target: { value: '' } });
    fireEvent.change(inputs.username, { target: { value: '' } });
    fireEvent.change(inputs.password, { target: { value: '' } });
  });

  await waitFor(() => {
    expect(registerBTN).toHaveAttribute('disabled', '');
    expect(container).toHaveTextContent('Email is required');
    expect(container).toHaveTextContent('Username is required');
    expect(container).toHaveTextContent(
      'Password must be at least 6 characters'
    );
  });

  act(() => {
    fireEvent.change(inputs.email, { target: { value: 'invalid-email.com' } });
  });

  await waitFor(() => {
    expect(container).toHaveTextContent('Enter a valid email');
  });

  act(() => {
    fireEvent.change(inputs.email, {
      target: { value: 'valid.email@gmail.com' },
    });
    fireEvent.change(inputs.username, { target: { value: 'admin' } });
    fireEvent.change(inputs.password, { target: { value: '123456' } });
  });

  await waitFor(() => {
    expect(registerBTN).not.toHaveAttribute('disabled', '');
    expect(container).not.toHaveTextContent('Email is required');
    expect(container).not.toHaveTextContent('Username is required');
    expect(container).not.toHaveTextContent(
      'Password must be at least 6 characters'
    );
  });
});
