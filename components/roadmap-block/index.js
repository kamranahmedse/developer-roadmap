import Link from 'next/link';
import { BlockLink, BlockSubtitle, BlockTitle } from './style';

const RoadmapBlock = ({ roadmap }) => (
  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
    <Link href={ roadmap.slug } passHref>
      <BlockLink>
        <BlockTitle>{ roadmap.title }</BlockTitle>
        <BlockSubtitle>{ roadmap.featuredDescription || roadmap.description }</BlockSubtitle>
      </BlockLink>
    </Link>
  </div>
);

export default RoadmapBlock;