import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "@material-tailwind/react";

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
