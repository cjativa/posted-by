import 'tailwindcss/tailwind.css';
import { configure } from 'axios-hooks';

import '../styles/globals.css';

import { AxiosConfig } from '../src/hooks/useAxiosConfig';

configure({
  axios: AxiosConfig
});

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
export default MyApp
