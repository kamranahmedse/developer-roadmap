import { FeaturedContentWrap } from './style';
import Link from 'next/link';
import roadmaps from '../../data/roadmaps';

const FeaturedRoadmaps = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <div className="featured-head">
        <h3>Featured Content</h3>
        <p className="border-through  featured-separator">
            <span>
              List of roadmaps mostly visited by the community&nbsp;
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
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container" key={roadmap.slug}>
              <Link href={ roadmap.slug }>
                <a className="featured-block">
                  <h4>{ roadmap.title }</h4>
                  <p>{ roadmap.featuredDescription || roadmap.description }</p>
                </a>
              </Link>
            </div>
          )) }
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedRoadmaps;