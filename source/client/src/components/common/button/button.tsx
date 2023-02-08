interface Props {
  children: React.ReactNode;
  variant?: 'dark' | 'red';
}

const colorVariants = {
  red: 'bg-coralRed',
  dark: 'bg-gunmetal',
} as const;

export const Button = ({ children, variant = 'red' }: Props) => {
  return (
    <button
      className={`w-full rounded-2xl ${colorVariants[variant]} p-2.5 font-normal hover:bg-opacity-80 active:bg-opacity-70`}
    >
      {children}
    </button>
  );
};
