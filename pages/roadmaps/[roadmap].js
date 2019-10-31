import roadmaps from "../../data/roadmaps";
import DefaultLayout from '../../layouts/default/index';
import PageHeader from '../../components/page-header/index';
import { serverOnlyProps } from '../../lib/server';
import RoadmapSummary from '../../components/roadmap-summary';
import PageFooter from '../../components/page-footer';

const Roadmap = ({ roadmap }) => {
  return (
    <DefaultLayout>
      <PageHeader />
      <RoadmapSummary roadmap={ roadmap } />
      <PageFooter />
    </DefaultLayout>
  );
};

Roadmap.getInitialProps = serverOnlyProps(({ req }) => {
  const normalizedUrl = req.url.replace('roadmaps/', '');
  return {
    roadmap: roadmaps.find(roadmap => roadmap.slug === normalizedUrl),
  };
});

export default Roadmap;