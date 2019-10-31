import Error from 'next/error';
import DefaultLayout from '../../../layouts/default';
import { serverOnlyProps } from '../../../lib/server';
import PageHeader from '../../../components/page-header';
import PageFooter from '../../../components/page-footer';
import { getRequestedRoadmap } from '../../../lib/roadmap';
import RoadmapSummary from '../../../components/roadmap-summary';

const Roadmap = ({ roadmap }) => {
  if (!roadmap) {
    return <Error statusCode={ 404 } />
  }

  return (
    <DefaultLayout>
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