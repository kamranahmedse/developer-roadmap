import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import 'prism-themes/themes/prism-shades-of-purple.css';
import { roadmapTheme } from '../styles/theme';
import { firePageView } from '../lib/gtag';
import '../styles/carbon.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    firePageView(window.location.pathname);
  }, []);

  return (
    <ChakraProvider theme={roadmapTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
