import Error from 'next/error';
import DefaultLayout from 'layouts/default';
import PageHeader from 'components/page-header';
import PageFooter from 'components/page-footer';
import RoadmapSummary from 'components/roadmap-summary';
import { serverOnlyProps } from 'lib/server';
import { getRequestedRoadmap } from 'lib/roadmap';
import Helmet from '../../components/helmet';

const Roadmap = ({ roadmap }) => {
  if (!roadmap) {
    return <Error statusCode={ 404 } />
  }

  return (
    <DefaultLayout>
      <Helmet title={ roadmap.title } description={ roadmap.description } />
      <PageHeader />
      <RoadmapSummary roadmap={ roadmap } />
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
