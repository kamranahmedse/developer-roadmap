import { HeaderWrap } from './style';

const SiteNav = () => (
  <HeaderWrap>
    <div className='top-row container'>
      <div className='flex-grow-1 brand'>
        <a href='/'>
          <img src='/static/brand.png' alt='' />
        </a>
      </div>
      <div className='nav-links'>
        <a href='/roadmaps'>Roadmaps</a>
        <a href='/guides'>Guides</a>
        <a href='/about' className='d-none d-md-inline-block'>FAQ</a>
        <a href='/signup' className='signup'>Subscribe</a>
      </div>
    </div>
  </HeaderWrap>
);

export default SiteNav;
