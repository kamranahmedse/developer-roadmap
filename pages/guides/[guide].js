import Error from "next/error";
import GuideLayout from 'layouts/guide';
import { serverOnlyProps } from 'lib/server';
import GuideHeader from 'components/guide-header';
import GuideBody from 'components/guide-body';
import ShareGuide from 'components/share-guide';
import GuideFooter from 'components/guide-footer';
import { getRequestedGuide } from 'lib/guide';
import Helmet from 'components/helmet';

const Guide = ({ guide }) => {
  if (!guide) {
    return <Error statusCode={ 404 } />
  }

  const GuideContent = require(`../../data/guides/${guide.fileName}.md`).default;

  return (
    <GuideLayout>
      <Helmet title={ guide.title } description={ guide.description } />
      <GuideHeader guide={ guide } />
      <GuideBody>
        <GuideContent />
        <ShareGuide guide={ guide } />
      </GuideBody>
      <GuideFooter guide={ guide } />
    </GuideLayout>
  );
};

Guide.getInitialProps = serverOnlyProps(async ({ req }) => {
  return {
    guide: await getRequestedGuide(req),
  };
});

export default Guide;
