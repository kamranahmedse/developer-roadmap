import GuideLayout from '../../layouts/guide';
import { serverOnlyProps } from '../../lib/server';

import GuideHeader from '../../components/guide-header';
import GuideBody from '../../data/guides/design-patterns-for-humans.md';

const Guide = ({ guide }) => {
  return (
    <GuideLayout>
      <GuideHeader />
      <div className="container">
        <GuideBody />
      </div>
    </GuideLayout>
  );
};

Guide.getInitialProps = serverOnlyProps(({ req }) => {
  const slug = req.url.replace(/^\/*?guides\/*?/, '/').replace(/\/*$/, '');

  return {
    slug,
  };
});

export default Guide;