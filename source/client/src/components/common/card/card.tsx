import Image from 'next/image';
import CatImage from '@/assets/cat.jpeg';
import { Badge } from '../badge';
import { Button } from '../button';

export const Card = () => {
  return (
    <div className="flex w-97.5 flex-col overflow-hidden rounded-4xl bg-gunmetal">
      <Image alt="cat" className="h-87.5 w-full object-cover" src={CatImage} />
      <div className="flex flex-col gap-y-5 px-5 py-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl">Golden eye cat at garden</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="font-normal">Categories:</p>
            <div className="flex flex-row gap-x-3 pl-3">
              <Badge>cats</Badge>
              <Badge>cute</Badge>
              <Badge>animals</Badge>
            </div>
          </div>
          <div className="py-3">
            <Button>Download</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
