import Link from 'next/link';
import siteConfig from "content/site";
import { FooterWrap } from './style.js'

const PageFooter = () => (
  <FooterWrap className="border-top">
    <div className="container">
      <div className="foot-cols-wrap row">
        <div className="site-meta-wrap col-12 col-sm-12 col-lg col-xl col-md-12">
          <div className="site-meta">
            <div className="brand-detail">
              <a href="/" className='brand'><img src="/brand.png" alt="" /> roadmap.sh</a>
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
            <li><a href={ siteConfig.url.addGuide } target="_blank">Write a Guide</a></li>
            <li><a href={ siteConfig.url.addRoadmap } target="_blank">Submit a Roadmap</a></li>
            <li><a href={ siteConfig.url.addResources } target="_blank">Add resources</a></li>
            <li><a href={ siteConfig.url.repo } target="_blank">Codebase</a></li>
          </ul>
        </div>
        <div className="site-learn foot-col col-12 col-sm-4 col-lg-2">
          <ul>
            <li className="foot-header">Learn</li>
            <li><a href="/guides">Read Guides</a></li>
            <li><a href="/roadmaps">View Roadmaps</a></li>
            <li><a href={ siteConfig.url.contribute } target="_blank">Contribute</a></li>
          </ul>
        </div>
        <div className="site-learn foot-col col-12 col-sm-4 col-lg-2">
          <ul>
            <li className="foot-header">Most Visited</li>
            <li><a href="/frontend">Frontend Roadmap</a></li>
            <li><a href="/backend">Backend Roadmap</a></li>
            <li><a href="/devops">DevOps Roadmap</a></li>
            <li><a href="/roadmaps">Upcoming</a></li>
          </ul>
        </div>
      </div>
    </div>
  </FooterWrap>
);

export default PageFooter;
