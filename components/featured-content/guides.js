import Link from 'next/link';
import { FeaturedContentWrap } from './style';
import FeaturedGuide from 'components/featured-guide';
import { getFeaturedGuides } from 'lib/guide';

const FeaturedGuides = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <p className='border-through featured-separator'>
          <span>
            Guides mostly visited by the community&nbsp;
            <a href="/guides" className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Guides &rarr;</a>
          </span>
      </p>
      <div className="swim-lane row">
        { getFeaturedGuides()
          .map(guide => (
            <FeaturedGuide guide={ guide } key={ guide.url } />
          )) }
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedGuides;
