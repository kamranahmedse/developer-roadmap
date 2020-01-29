import Error from 'next/error';
import DefaultLayout from 'layouts/default';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import { serverOnlyProps } from 'lib/server';
import { getRequestedRoadmap } from 'lib/roadmap';
import siteConfig from 'content/site';
import Helmet from 'components/helmet';
import RoadmapSummary from 'components/roadmap-summary';
import DetailedRoadmap from 'components/detailed-roadmap';

const Roadmap = ({ roadmap, canonical }) => {
  if (!roadmap) {
    return <Error statusCode={ 404 } />
  }

  const showSummary = roadmap.upcoming || !roadmap.detailed;
  return (
    <DefaultLayout>
      <Helmet
        canonical={canonical}
        title={ roadmap?.seo?.title || roadmap.title }
        description={ roadmap?.seo?.description || roadmap.description }
        keywords={ roadmap?.keywords || [] }
      />
      <SiteNav />
      { showSummary ? <RoadmapSummary roadmap={roadmap} /> : <DetailedRoadmap roadmap={roadmap} /> }
      <PageFooter />
    </DefaultLayout>
  );
};

Roadmap.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    canonical: `${siteConfig.url.web}${req.url}`,
    roadmap: getRequestedRoadmap(req),
  };
});

export default Roadmap;
