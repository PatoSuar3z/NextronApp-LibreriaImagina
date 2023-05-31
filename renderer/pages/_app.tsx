import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "@material-tailwind/react";
import { DarkProvider } from '../context/darkMode'; 

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DarkProvider>
        <Component {...pageProps} />
      </DarkProvider>
    </ThemeProvider>
  );
}

export default MyApp
