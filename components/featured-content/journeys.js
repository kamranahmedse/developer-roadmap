import { FeaturedContentWrap } from './style';

const FeaturedJourneys = () => (
  <FeaturedContentWrap className="featured-content-wrap">
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
            <img src="/static/dan-abramov.jpeg" alt="" />
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
  </FeaturedContentWrap>
);

export default FeaturedJourneys;