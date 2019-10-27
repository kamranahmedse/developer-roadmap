import { FeaturedContentWrap } from './style';

const FeaturedGuides = () => (
  <FeaturedContentWrap className="featured-content-wrap">
    <div className="container">
      <p className='border-through featured-separator'>
          <span>
            List of most visited guides&nbsp;
            <a href="#" className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Guides &rarr;</a>
          </span>
      </p>
      <div className="swim-lane row">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Design Patterns for Humans</h4>
            <p>A language agnostic, ultra-simplified explanation to design patterns</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Learn Regex</h4>
            <p>An easy to understand guide on regular expressions with real world examples</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Bash Guide</h4>
            <p>Easy to understand guide for bash with real world usage examples.</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>DNS in One Picture</h4>
            <p>Quick illustrative guide on how a website is found on the internet.</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>Using React Hooks</h4>
            <p>Start using React hooks in your react applications today with this guide.</p>
          </a>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 grid-item-container">
          <a className="featured-block" href='#'>
            <h4>HTTP Caching</h4>
            <p>Everything you need to know about web caching</p>
          </a>
        </div>
      </div>
    </div>
  </FeaturedContentWrap>
);

export default FeaturedGuides;