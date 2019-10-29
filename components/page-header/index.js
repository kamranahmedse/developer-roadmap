import { HeaderWrap } from './style';

const PageHeader = () => (
  <HeaderWrap>
    <div className="top-row container">
      <div className="flex-grow-1 brand">
        <a href="/">
          <img src="/static/brand.png" alt="" />
        </a>
      </div>
      <div className="nav-links">
        <a href="#">Roadmaps</a>
        <a href="#">Guides</a>
        <a href="#">FAQs</a>
        <a href="#" className='signup'>Sign Up</a>
      </div>
    </div>
  </HeaderWrap>
);

export default PageHeader;