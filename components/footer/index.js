import './style.scss';

const Footer = () => (
  <div className="page-footer">
    <div className="container">
      <div className="site-meta">
        <div className="brand-detail">
          <a href="#" className='brand'><img src="/static/brand.png" alt="" /> roadmap.sh</a>
          <span className="preposition">by</span>
          <a href="#" className='follow-author'>@kamranahmedse</a>
        </div>
        <div className="brand-explanation">
          <p>Community created roadmaps, articles, resources and journeys to help you choose your path and grow in your career.</p>
        </div>
        <p className='meta-links'>
          &copy; roadmap.sh &middot;
          &nbsp; <a href="#">FAQ</a> &middot;
          &nbsp; <a href="#">Terms</a> &middot;
          &nbsp; <a href="#">Privacy</a>
        </p>
      </div>
    </div>
  </div>
);

export default Footer;