import NextHead from 'next/head';

const defaultDescription = 'Roadmaps, articles and resources for modern developers';
const defaultOgUrl = 'https://roadmap.sh';

const Head = (props) => (
  <NextHead>
    <meta charSet='UTF-8' />
    <title>{ props.title || '' }</title>
    <meta name='description' content={ props.description || defaultDescription } />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta property='og:url' content={ props.url || defaultOgUrl } />
    <meta property='og:title' content={ props.title || '' } />
  </NextHead>
);

export default Head;