import { twMerge } from 'tailwind-merge';

const gradientStyle = {
  background:
    'linear-gradient(90deg, #D9D9D9 0%, rgba(217, 217, 217, 0.18) 22.05%, rgba(217, 217, 217, 0.680523) 50.56%, rgba(217, 217, 217, 0.48) 82.29%, #D9D9D9 103.27%)',
};

interface Properties {
  containerClassName?: string;
}

export const CardSkeleton = ({ containerClassName }: Properties) => {
  return (
    <div
      className={twMerge(
        containerClassName,
        'text-black flex w-97.5 animate-pulse flex-col items-center  overflow-hidden rounded-4xl'
      )}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
      }}
    >
      <div className="mb-4 h-64 w-full" style={gradientStyle}></div>
      <div className="mb-2 h-8 w-96 rounded-md" style={gradientStyle}></div>
      <div className="mb-9 h-24 w-96 rounded-md" style={gradientStyle}></div>
      <div className="mb-2 h-5 w-96 rounded-md" style={gradientStyle}></div>
      <div className="mb-2 h-10 w-96 rounded-md" style={gradientStyle}></div>
    </div>
  );
};
