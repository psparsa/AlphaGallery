import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Properties {
  children: string;
  containerClassName?: string;
  fluid?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  onClick,
}: Properties) => {
  return (
    <button
      className={twMerge(
        colorVariants[variant],
        fluid ? 'w-full' : 'w-28',
        'rounded-2xl p-2.5 font-medium hover:bg-opacity-80 active:bg-opacity-70',
        containerClassName
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
