import React from 'react';
import { AppWrapper } from '../context/user-context';

// eslint-disable-next-line react/prop-types
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}
