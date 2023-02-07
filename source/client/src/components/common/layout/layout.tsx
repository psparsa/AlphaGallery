import { Roboto } from '@next/font/google';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
}

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

export const Layout = ({ children }: Props) => {
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
          'w-screen min-h-screen flex flex-col',
          'bg-chineseBlack text-snow'
        )}
      >
        {children}
      </main>
    </>
  );
};
