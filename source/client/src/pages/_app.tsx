import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ReactQueryProvider } from '@/providers/react-query-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </>
  );
}
