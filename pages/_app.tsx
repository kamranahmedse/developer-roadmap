import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import 'prism-themes/themes/prism-shades-of-purple.css';
import 'focus-visible/dist/focus-visible';
import { roadmapTheme } from '../styles/theme';
import { firePageView } from '../lib/gtag';
import '../styles/carbon.css';
import { StickyBanner } from '../components/sticky-banner';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the 
    element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    firePageView(window.location.pathname);
  }, []);

  return (
    <ChakraProvider theme={roadmapTheme}>
      <Global styles={GlobalStyles} />
      <StickyBanner />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
