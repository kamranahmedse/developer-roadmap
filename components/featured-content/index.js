import { FeaturedWrap } from './style';
import FeaturedJourneys from './journeys';
import FeaturedGuides from './guides';
import FeaturedRoadmaps from './roadmaps';

const FeaturedContent = (props) => (
  <FeaturedWrap className="border-top bg-light">
    <FeaturedRoadmaps />
    <FeaturedGuides />
  </FeaturedWrap>
);

FeaturedContent.defaultProps = {
  className: '',
};

export default FeaturedContent;