import 'react-toastify/dist/ReactToastify.css';
import { getUserInfo } from '@/api';
import type { GetServerSideProps } from 'next';
import { LoginForm } from '@/components/common/login-form/login-form';
import { Roboto } from '@next/font/google';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token)
    return {
      props: {},
    };

  const { id: userId } = await getUserInfo({ jwt: token }).catch();

  if (userId)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

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
