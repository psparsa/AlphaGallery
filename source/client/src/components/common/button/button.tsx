import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Properties {
  children: string;
  containerClassName?: string;
  disable?: boolean;
  fluid?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'dark' | 'red';
}

const colorVariants = {
  red: 'bg-coralRed',
  dark: 'bg-gunmetal',
} as const;

export const Button = ({
  children,
  containerClassName,
  fluid = false,
  variant = 'red',
  type,
  onClick,
  disable,
}: Properties) => {
  return (
    <button
      className={twMerge(
        colorVariants[variant],
        fluid ? 'w-full' : 'w-32',
        'rounded-2xl p-2.5 font-medium text-snow',
        containerClassName,
        disable ? 'opacity-40' : 'hover:bg-opacity-80 active:bg-opacity-70'
      )}
      onClick={onClick}
      type={type ?? 'button'}
      disabled={disable}
    >
      {children}
    </button>
  );
};
