import roadmaps from 'data/roadmaps';
import DefaultLayout from 'layouts/default/index';
import TopNav from 'components/top-nav';
import RoadmapBlock from 'components/roadmap-block';

const RoadmapsList = () => (
  <DefaultLayout>
    <TopNav />
    <div className="container">
      <div className="row">
        { roadmaps
          .map(roadmap => (
            <RoadmapBlock roadmap={ roadmap } key={ roadmap.url } />
          )) }
      </div>
    </div>
  </DefaultLayout>
);

export default RoadmapsList;
