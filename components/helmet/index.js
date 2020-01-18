import NextHead from 'next/head';
import siteConfig from 'storage/site';

const prepareTitle = (givenTitle) => {
  givenTitle = givenTitle || siteConfig.title;
  return `${givenTitle} - ${siteConfig.name}`;
};

const prepareDescription = (givenDescription) => {
  return givenDescription || siteConfig.description;
};

// noinspection JSUnresolvedLibraryURL
const Helmet = (props) => (
  <NextHead>
    <meta charSet='UTF-8' />

    <title>{ prepareTitle(props.title) }</title>
    <meta name='description' content={ prepareDescription(props.description) } />

    <meta name="author" content={ siteConfig.author } />
    <meta name="keywords" content={ siteConfig.keywords.join(',') } />

    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0" />
    { props.canonical && <link rel="canonical" href={ props.canonical } /> }
    <meta httpEquiv="Content-Language" content="en" />

    <meta property="og:title" content={ prepareTitle(props.title) } />
    <meta property="og:description" content={ prepareDescription(props.description) } />
    <meta property="og:image" content={ `${siteConfig.url.web}${siteConfig.logoSquare}` } />
    <meta property="og:url" content={ siteConfig.url.web } />
    <meta property="og:type" content="website" />
    <meta property="article:publisher" content={ `https://facebook.com/${siteConfig.facebook}` } />
    <meta property="og:site_name" content={ siteConfig.name } />
    <meta property="article:author" content={ siteConfig.author } />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content={ `@${siteConfig.twitter}` } />
    <meta name="twitter:title" content={ prepareTitle(props.title) } />
    <meta name="twitter:description" content={ prepareDescription(props.description) } />
    <meta name="twitter:image" content={ `${siteConfig.url.web}${siteConfig.logoSquare}` } />
    <meta name="twitter:image:alt" content="roadmap.sh" />

    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
    <meta name="msapplication-TileColor" content="#101010" />
    <meta name="theme-color" content="#848a9a" />

    <link rel="manifest" href="/manifest/manifest.json" />
    <link rel="icon" type="image/png" sizes="32x32" href="/manifest/icon32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/manifest/icon16.png" />
    <link rel="shortcut icon" href="/manifest/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/manifest/favicon.ico" type="image/x-icon" />

    { /* Global Site Tag (gtag.js) - Google Analytics */ }
    { process.env.GA_SECRET && (
      <>
        <script async src={ `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_SECRET}` } />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_SECRET}');
          `,
        }} />
        <script
          data-ad-client="ca-pub-7480420865005146"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      </>
    )}

  </NextHead>
);

export default Helmet;
