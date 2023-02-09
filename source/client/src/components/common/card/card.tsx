import Image from 'next/image';
import CatImage from '@/assets/cat.jpeg';
import { Badge } from '../badge';
import { Button } from '../button';

interface Properties {
  categories: string[];
  description: string;
  title: string;
}

export const Card = ({ title, description, categories }: Properties) => {
  return (
    <div className="flex w-97.5 flex-col overflow-hidden rounded-4xl bg-gunmetal">
      <Image alt="cat" className="h-87.5 w-full object-cover" src={CatImage} />
      <div className="flex flex-col gap-y-5 px-5 py-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="font-normal">Categories:</p>
            <div className="flex flex-row gap-x-3 pl-3">
              {categories.map((cat) => (
                <Badge key="cat">{cat}</Badge>
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
