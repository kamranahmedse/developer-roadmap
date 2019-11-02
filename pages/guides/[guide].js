import GuideLayout from '../../layouts/guide';
import { serverOnlyProps } from '../../lib/server';

import GuideHeader from '../../components/guide-header';
import GuideContent from '../../data/guides/design-patterns-for-humans.md';
import GuideBody from '../../components/guide-body';

const Guide = ({ guide }) => {
  return (
    <GuideLayout>
      <GuideHeader />
      <GuideBody>
        <GuideContent />
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