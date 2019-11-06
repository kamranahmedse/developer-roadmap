import Error from "next/error";
import GuideLayout from 'layouts/guide';
import { serverOnlyProps } from 'lib/server';
import GuideHeader from 'components/guide-header';
import GuideBody from 'components/guide-body';
import ShareGuide from 'components/share-guide';
import GuideFooter from 'components/guide-footer';
import { getRequestedGuide } from "lib/guide";

const Guide = ({ guide }) => {
  if (!guide) {
    return <Error statusCode={404} />
  }

  return (
    <GuideLayout>
      <GuideHeader guide={guide} />
      <GuideBody>
        <guide.component />
        <ShareGuide/>
      </GuideBody>
      <GuideFooter guide={guide} />
    </GuideLayout>
  );
};

Guide.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    guide: getRequestedGuide(req)
  };
});

export default Guide;
