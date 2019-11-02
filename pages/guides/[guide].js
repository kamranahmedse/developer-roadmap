import GuideLayout from '../../layouts/guide';
import { serverOnlyProps } from '../../lib/server';

import GuideHeader from '../../components/guide-header';
import GuideContent from '../../data/guides/keep-it-clean.md';
import GuideBody from '../../components/guide-body';
import ShareGuide from '../../components/share-guide';
import GuideFooter from '../../components/guide-footer';

const Guide = ({ guide }) => {
  return (
    <GuideLayout>
      <GuideHeader />
      <GuideBody>
        <GuideContent />
        <ShareGuide />
        <GuideFooter />
      </GuideBody>
    </GuideLayout>
  );
};

Guide.getInitialProps = serverOnlyProps(({ req }) => {
  // Remove URL chunk to make it a slug e.g. /guides/some-guide-item to become `some-guide-item
  const slug = req.url
    .replace(/^\/*?guides\/*?/, '/')
    .replace(/\/*$/, '');

  return {
    slug,
  };
});

export default Guide;