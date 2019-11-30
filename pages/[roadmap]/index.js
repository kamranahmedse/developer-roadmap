import Error from 'next/error';
import DefaultLayout from 'layouts/default';
import SiteNav from 'components/site-nav';
import PageFooter from 'components/page-footer';
import { serverOnlyProps } from 'lib/server';
import { getRequestedRoadmap } from 'lib/roadmap';
import Helmet from 'components/helmet';
import RoadmapSummary from 'components/roadmap-summary';
import RoadmapBody from '../../components/roadmap-body';

const Roadmap = ({ roadmap }) => {
  if (!roadmap) {
    return <Error statusCode={ 404 } />
  }

  const showSummary = roadmap.upcoming || !roadmap.detailed;
  return (
    <DefaultLayout>
      <Helmet title={ roadmap.title } description={ roadmap.description } />
      <SiteNav />
      { showSummary ? <RoadmapSummary roadmap={roadmap} /> : <RoadmapBody roadmap={roadmap} /> }
      <PageFooter />
    </DefaultLayout>
  );
};

Roadmap.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    roadmap: getRequestedRoadmap(req),
  };
});

export default Roadmap;
