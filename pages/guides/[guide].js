import Error from "next/error";
import GuideLayout from 'layouts/guide';
import { serverOnlyProps } from 'lib/server';
import GuideHeader from 'components/guide-header';
import GuideBody from 'components/guide-body';
import GuideFooter from 'components/guide-footer';
import { getRequestedGuide } from 'lib/guide';
import Helmet from 'components/helmet';
import siteConfig from 'storage/site';

const Guide = ({ guide, canonical }) => {
  if (!guide) {
    return <Error statusCode={ 404 } />
  }

  return (
    <GuideLayout>
      <Helmet
        title={ guide.title }
        description={ guide.description }
        canonical={ guide.canonical || canonical }
      />
      <GuideHeader guide={ guide } />
      <GuideBody guide={ guide } />
      <GuideFooter guide={ guide } />
    </GuideLayout>
  );
};

Guide.getInitialProps = serverOnlyProps(async ({ req }) => {
  return {
    canonical: `${siteConfig.url.web}${req.url}`,
    guide: await getRequestedGuide(req),
  };
});

export default Guide;
