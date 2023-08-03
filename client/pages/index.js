import Head from 'next/head';
import { UserContext } from '../context/user-context';
import React, { useContext } from 'react';
import SignIn from './sign-in/sign-In';
import Dashboard from './dashboard/dashboard';
import styles from '../styles/Dashboard.module.css';

export default function Home() {
  const { isSignedin } = useContext(UserContext);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/images/brand-logo.svg" />
      </Head>
      <main>
        {
          !isSignedin ? <SignIn /> : <Dashboard />
        }
      </main>
    </div>
  )
}
