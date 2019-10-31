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
    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
  </NextHead>
);

export default Head;