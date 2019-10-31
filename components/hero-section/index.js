import Link from 'next/link';
import { HeroSectionWrap } from './style';

const HeroSection = () => (
  <HeroSectionWrap>
    <div className="container">
      <h1>Developer Roadmaps</h1>
      <p>Community driven roadmaps, articles and resources for developers. <Link href="/signup"><a>Sign up</a></Link> to share your journey, write guides, track your skillset and get your work reviewed</p>
    </div>
  </HeroSectionWrap>
);

export default HeroSection;