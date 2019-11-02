import Link from 'next/link';
import { FooterWrap } from './style.js'

const PageFooter = () => (
  <FooterWrap className="border-top">
    <div className="container">
      <div className="foot-cols-wrap row">
        <div className="site-meta-wrap col-12 col-sm-12 col-lg col-xl col-md-12">
          <div className="site-meta">
            <div className="brand-detail">
              <Link href="/"><a className='brand'><img src="/static/brand.png" alt="" /> roadmap.sh</a></Link>
              <span className="preposition">by</span>
              <a href="https://twitter.com/kamranahmedse" target="_blank" className='follow-author'>@kamranahmedse</a>
            </div>
            <div className="brand-explanation">
              <p>Community created roadmaps, articles, resources and journeys to help you choose your path and grow in your career.</p>
            </div>
            <p className='meta-links'>
              &copy; roadmap.sh &middot;
              &nbsp; <a href="/about">FAQ</a> &middot;
              &nbsp; <a href="/terms">Terms</a> &middot;
              &nbsp; <a href="/privacy">Privacy</a>
            </p>
          </div>
        </div>
        <div className="site-contribute foot-col col-12 col-sm-4 col-lg-2">
          <ul>
            <li className='foot-header'>Contribute</li>
            <li><a href="#">Write an Article</a></li>
            <li><a href="#">Submit a Roadmap</a></li>
            <li><a href="#">Add resources</a></li>
            <li><a href="#">Codebase</a></li>
          </ul>
        </div>
        <div className="site-learn foot-col col-12 col-sm-4 col-lg-2">
          <ul>
            <li className="foot-header">Learn</li>
            <li><a href="#">Read Articles</a></li>
            <li><a href="#">Follow Roadmap</a></li>
            <li><a href="#">Review Projects</a></li>
            <li><a href="#">Contribute</a></li>
          </ul>
        </div>
        <div className="site-learn foot-col col-12 col-sm-4 col-lg-2">
          <ul>
            <li className="foot-header">Most Visited</li>
            <li><a href="#">Frontend Roadmap</a></li>
            <li><a href="#">Backend Roadmap</a></li>
            <li><a href="#">DevOps Roadmap</a></li>
            <li><a href="#">One for All</a></li>
          </ul>
        </div>
      </div>
    </div>
  </FooterWrap>
);

export default PageFooter;