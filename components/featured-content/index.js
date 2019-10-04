import './style.scss';

const FeaturedContent = (props) => (
  <>
    <div className="featured-content-wrap">
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
    </div>
    <div className="featured-content-wrap">
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
    </div>
    <div className="featured-content-wrap">
      <div className="container">
        <p className='border-through featured-separator'>
          <span>
            List of most visited Journeys&nbsp;
            <a href="#" className="dark-link d-none d-sm-none d-md-inline d-xl-inline">View all Journeys &rarr;</a>
          </span>
        </p>
        <div className="swim-lane row featured-journeys">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 grid-item-container journey-block">
            <a href="#">
              <img src="/static/kamran.jpeg" alt="" />
              <div className="journey-meta">
                <h4>Kamran Ahmed</h4>
                <p>Engineering Lead at Al-tayer</p>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 grid-item-container journey-block">
            <a href="#">
              <img src="/static/aras.jpeg" alt="" />
              <div className="journey-meta">
                <h4>Aras Atasaygin</h4>
                <p>Engg. Manager at Al-tayer</p>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 grid-item-container journey-block">
            <a href="#">
              <img src="/static/dan-abramove.jpeg" alt="" />
              <div className="journey-meta">
                <h4>Dan Abramov</h4>
                <p>Co-founder and CTO at Blink</p>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 grid-item-container journey-block">
            <a href="#">
              <img src="/static/chris-coyier.jpeg" alt="" />
              <div className="journey-meta">
                <h4>Chris Coyier</h4>
                <p>Co-founder of Codepen</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

FeaturedContent.defaultProps = {
  className: '',
};

export default FeaturedContent;