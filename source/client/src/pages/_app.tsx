import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { AuthProvider } from '@/auth/auth-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ReactQueryProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ReactQueryProvider>
    </>
  );
}
