import Head from 'next/head';
import { Roboto } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import { Search } from '@/components/common/search/search';
import { ScrollButton } from '@/components/common/scroll-button/scroll-button';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });
const robotoLight = Roboto({ weight: '300', subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AlphaGallery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={twMerge(
          roboto.className,
          'w-screen min-h-screen flex flex-col items-center',
          'bg-chineseBlack text-snow'
        )}
      >
        <div
          className="w-screen min-h-screen flex flex-col items-center
        justify-center bg-chineseBlackVoid"
        >
          <div
            className="w-full flex flex-col flex-1 items-center
        justify-center"
          >
            <div
              className={twMerge(
                robotoLight.className,
                'sm:text-7xl text-6xl text-coralRed text-center '
              )}
            >
              Alpha Gallery
            </div>
            <div className="text-begonia mt-4">
              Explore and Upload Images just by a few clicks...
            </div>
            <Search containerClassName="mt-16" />
          </div>

          <ScrollButton containerClassName="mb-4" />
        </div>

        <div
          className="w-screen min-h-screen flex flex-col items-center
        justify-center bg-gradient-to-b from-chineseBlackVoid to-chineseBlack"
        ></div>
      </main>
    </>
  );
}
