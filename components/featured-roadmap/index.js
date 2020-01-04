import { BlockLink, BlockSubtitle, BlockTitle } from './style';

const FeaturedRoadmap = ({ roadmap }) => (
  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container'>
    <BlockLink href={roadmap.url}>
      <BlockTitle>{roadmap.title}</BlockTitle>
      <BlockSubtitle>{roadmap.featuredDescription || roadmap.description}</BlockSubtitle>
    </BlockLink>
  </div>
);

export default FeaturedRoadmap;
