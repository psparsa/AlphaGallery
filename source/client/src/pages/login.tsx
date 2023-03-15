import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from '@/components/common';
import { Roboto } from '@next/font/google';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>AlphaGallery - Login</title>
      </Head>

      <main
        style={roboto.style}
        className="flex min-h-screen w-screen items-center justify-center bg-chineseBlack"
      >
        <LoginForm containerClassName="my-4" />
      </main>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
