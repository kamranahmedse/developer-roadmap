import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { roadmapTheme } from '../lib/theme';
import 'prism-themes/themes/prism-shades-of-purple.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={roadmapTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
