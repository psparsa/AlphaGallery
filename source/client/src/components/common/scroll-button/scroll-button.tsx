import { twMerge } from 'tailwind-merge';

interface ScrollButtonProperties {
  containerClassName?: string;
}

const handleScroll = () => {
  window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
};

export const ScrollButton = ({
  containerClassName,
}: ScrollButtonProperties) => {
  return (
    <div
      className={twMerge(
        containerClassName,
        'flex h-10 w-5 cursor-pointer items-end justify-center rounded-full border-2 border-solid border-snow'
      )}
      onClick={handleScroll}
    >
      <div className="mb-1 h-4 border border-solid border-snow"></div>
    </div>
  );
};
