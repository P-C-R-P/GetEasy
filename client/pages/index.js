import Head from 'next/head';
import { UserContext } from '../context/user-context';
import React, { useContext } from 'react';
import SignIn from './sign-in/sign-In';
import Dashboard from './dashboard/dashboard';
import { Helmet } from 'react-helmet';

export default function Home () {
  const { isSignedIn } = useContext(UserContext);

  return (
    <div>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/images/get-easy-brand-icon.png" />
      </Head>
      <main>{!isSignedIn ? <SignIn /> : <Dashboard />}</main>
    </div>
  );
}
