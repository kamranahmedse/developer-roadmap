import Link from 'next/link';
import { FeaturedContentWrap } from './style';
import guides from 'data/guides';
import GuideBlock from 'components/guide-block';

const FeaturedGuides = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <p className='border-through featured-separator'>
          <span>
            List of most visited guides&nbsp;
            <Link href="/guides"><a className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Guides &rarr;</a></Link>
          </span>
      </p>
      <div className="swim-lane row">
        { guides
          .filter(({ featured }) => featured)
          .map(guide => (
            <GuideBlock guide={ guide } key={ guide.url } />
          )) }
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedGuides;
