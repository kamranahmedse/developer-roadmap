import Error from 'next/error';
import DefaultLayout from 'layouts/default';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import { serverOnlyProps } from 'lib/server';
import { getRequestedRoadmap } from 'lib/roadmap';
import siteConfig from 'content/site';
import Helmet from 'components/helmet';
import RoadmapResources from '../../components/roadmap-resources';

const Resources = ({ roadmap, canonical }) => {
  if (!roadmap) {
    return <Error statusCode={404} />;
  }

  return (
    <DefaultLayout>
      <Helmet
        canonical={canonical}
        title={roadmap?.seo?.title || roadmap.title}
        description={roadmap?.seo?.description || roadmap.description}
        keywords={roadmap?.keywords || []}
      />
      <SiteNav />
      <RoadmapResources roadmap={roadmap} />
      <PageFooter />
    </DefaultLayout>
  );
};

Resources.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    canonical: `${siteConfig.url.web}${req.url}`,
    roadmap: getRequestedRoadmap(req)
  };
});

export default Resources;
