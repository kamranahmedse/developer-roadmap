import roadmaps from "../../data/roadmaps";
import DefaultLayout from '../../layouts/default/index';
import PageHeader from '../../components/page-header/index';
import { serverOnlyProps } from '../../lib/server';

const Roadmap = ({ roadmap }) => {
  return (
    <DefaultLayout>
      <PageHeader />
      <div className="container">
        <img src={ roadmap.picture } alt="" />
      </div>
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