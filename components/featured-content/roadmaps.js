import { FeaturedContentWrap } from './style';

const FeaturedRoadmaps = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <div className="featured-head">
        <h3>Featured Content</h3>
        <p className="border-through  featured-separator">
            <span>
              List of roadmaps mostly visited by the community&nbsp;
              <a href="#" className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Roadmaps &rarr;</a>
            </span>
        </p>
      </div>
      <div className="swim-lane row">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Frontend Developer</h4>
            <p>Step by step guide to becoming a modern frontend developer in 2019</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Backend Developer</h4>
            <p>Step by step guide to becoming a modern backend developer in 2019</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>DevOps Roadmap</h4>
            <p>Step by step guide to become an SRE or for any operations role in 2019</p>
          </a>
        </div>
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedRoadmaps;