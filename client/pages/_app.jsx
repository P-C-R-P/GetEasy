import React from 'react';
import { AppWrapper } from '../context/user-context';


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}

