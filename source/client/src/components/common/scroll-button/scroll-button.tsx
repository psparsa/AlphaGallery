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
        'w-5 h-10 rounded-full border-2 border-snow border-solid flex justify-center items-end cursor-pointer'
      )}
      onClick={handleScroll}
    >
      <div className="h-4 mb-1 border border-snow border-solid"></div>
    </div>
  );
};
