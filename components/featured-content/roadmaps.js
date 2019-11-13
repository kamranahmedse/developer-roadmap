import Link from 'next/link';
import { FeaturedContentWrap } from './style';
import roadmaps from 'storage/roadmaps';
import FeaturedRoadmap from 'components/featured-roadmap';

const FeaturedRoadmaps = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <div className="featured-head">
        <p className="border-through featured-separator">
            <span>
              Roadmaps mostly visited by the community&nbsp;
              <Link href='/roadmaps'>
                <a className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Roadmaps &rarr;</a>
              </Link>
            </span>
        </p>
      </div>
      <div className="swim-lane row">
        { roadmaps
          .filter(({ featured }) => featured)
          .map(roadmap => (
            <FeaturedRoadmap roadmap={ roadmap } key={ roadmap.url } />
          )) }
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedRoadmaps;
