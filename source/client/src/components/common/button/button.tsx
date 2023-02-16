import { twMerge } from 'tailwind-merge';

interface Properties {
  children: string;
  fluid?: boolean;
  variant?: 'dark' | 'red';
}

const colorVariants = {
  red: 'bg-coralRed',
  dark: 'bg-gunmetal',
} as const;

export const Button = ({
  children,
  fluid = false,
  variant = 'red',
}: Properties) => {
  return (
    <button
      className={twMerge(
        colorVariants[variant],
        fluid ? 'w-full' : '',
        'rounded-2xl p-2.5 font-normal hover:bg-opacity-80 active:bg-opacity-70'
      )}
    >
      {children}
    </button>
  );
};
