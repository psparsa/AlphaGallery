import Image from 'next/image';
import { Badge } from '../badge';
import { Button } from '../button';
import { twMerge } from 'tailwind-merge';

interface Properties {
  categories: string[];
  containerClassName?: string;
  description: string;
  imageSrc: string;
  title: string;
}

export const Card = ({
  containerClassName,
  title,
  description,
  categories,
  imageSrc,
}: Properties) => {
  return (
    <div
      className={twMerge(
        containerClassName,
        'flex w-97.5 flex-col overflow-hidden rounded-4xl bg-gunmetal'
      )}
    >
      <Image
        alt="cat"
        className="h-87.5 w-full object-cover"
        src={imageSrc}
        width={1000}
        height={1000}
      />
      <div className="flex flex-col gap-y-5 px-5 py-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="font-normal">Categories:</p>
            <div className="flex flex-row gap-x-3 pl-3">
              {categories.map((cat, index) => (
                <Badge key={index} label={cat} />
              ))}
            </div>
          </div>
          <div className="py-3">
            <Button fluid>Download</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
