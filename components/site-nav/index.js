import { HeaderWrap } from './style';

const SiteNav = () => (
  <HeaderWrap>
    <div className='top-row container'>
      <div className='flex-grow-1 brand'>
        <a href='/'>
          <img src='/brand.png' alt='' />
        </a>
      </div>
      <div className='nav-links'>
        <a href='/roadmaps'>Roadmaps</a>
        <a href='/guides'>Guides</a>
        <a href='/sponsors' className='d-none d-md-inline-block'>Sponsors</a>
        <a href='/about' className='d-none d-md-inline-block'>FAQ</a>
        <a href='/signup' className='d-none d-md-inline-block'>Subscribe</a>
      </div>
      <a className="github-button" href="https://github.com/kamranahmedse/developer-roadmap" data-size="large" data-show-count="true" aria-label="Star kamranahmedse/developer-roadmap on GitHub">GitHub</a>
    </div>
  </HeaderWrap>
);

export default SiteNav;
