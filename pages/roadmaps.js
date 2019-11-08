import roadmaps from 'data/roadmaps';
import DefaultLayout from 'layouts/default/index';
import SiteNav from 'components/site-nav';
import RoadmapBlock from 'components/roadmap-block';

const RoadmapsList = () => (
  <DefaultLayout>
    <SiteNav />
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
