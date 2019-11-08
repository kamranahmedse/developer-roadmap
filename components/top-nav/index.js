import Link from 'next/link';
import { HeaderWrap } from './style';

const TopNav = () => (
  <HeaderWrap>
    <div className="top-row container">
      <div className="flex-grow-1 brand">
        <a href="/">
          <img src="/static/brand.png" alt="" />
        </a>
      </div>
      <div className="nav-links">
        <Link href="/roadmaps"><a>Roadmaps</a></Link>
        <Link href="/guides"><a>Guides</a></Link>
        <Link href="/about"><a>FAQs</a></Link>
        <Link href="/signup"><a className="signup">Sign Up</a></Link>
      </div>
    </div>
  </HeaderWrap>
);

export default TopNav;
