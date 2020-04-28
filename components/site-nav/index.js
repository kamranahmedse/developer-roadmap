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

      <div className='ml-3 align-items-center d-flex'>
        <iframe src="https://ghbtns.com/github-btn.html?user=kamranahmedse&repo=developer-roadmap&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="190px" height="30px"></iframe>
      </div>
    </div>
  </HeaderWrap>
);

export default SiteNav;
