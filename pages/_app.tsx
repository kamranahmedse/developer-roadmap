import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import 'prism-themes/themes/prism-shades-of-purple.css';
import { roadmapTheme } from '../lib/theme';
import { firePageView } from '../lib/gtag';

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
