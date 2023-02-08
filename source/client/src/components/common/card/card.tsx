import Image from 'next/image';
import CatImage from '@/assets/cat.jpeg';

export const Card = () => {
  return (
    <div className="flex flex-col w-97.5 bg-gunmetal rounded-4xl overflow-hidden">
      <Image alt="cat" className="w-full h-87.5 object-cover" src={CatImage} />
      <div className="flex flex-col px-5 py-2 gap-y-5">
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
              <p className="bg-chineseBlack px-3 rounded-xl">cats</p>
              <p className="bg-chineseBlack px-3 rounded-xl">cute</p>
              <p className="bg-chineseBlack px-3 rounded-xl">animals</p>
            </div>
          </div>
          <div className="py-3">
            <button className="font-normal w-full bg-coralRed p-2.5 rounded-2xl hover:bg-opacity-80 active:bg-opacity-70 ">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
