import { FeaturedWrap } from './style';
import FeaturedGuides from './guides';
import FeaturedRoadmaps from './roadmaps';
import FeaturedJourneys from './journeys';

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
