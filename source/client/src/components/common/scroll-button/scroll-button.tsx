import { twMerge } from 'tailwind-merge';

interface Properties {
  containerClassName?: string;
  onClick?: () => void;
}

export const ScrollButton = ({ containerClassName, onClick }: Properties) => {
  return (
    <div
      className={twMerge(
        containerClassName,
        'flex h-10 w-5 cursor-pointer items-end justify-center rounded-full border-2 border-solid border-snow'
      )}
      onClick={onClick}
    >
      <div className="mb-1 h-4 border border-solid border-snow"></div>
    </div>
  );
};
