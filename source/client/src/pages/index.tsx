import Head from 'next/head';
import { Roboto } from '@next/font/google';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AlphaGallery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>Hello World!</main>
    </>
  );
}
