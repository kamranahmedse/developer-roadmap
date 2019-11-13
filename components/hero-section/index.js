import Link from 'next/link';
import { HeroSectionWrap } from './style';

const HeroSection = () => (
  <HeroSectionWrap>
    <div className="container">
      <h1>Developer Roadmaps</h1>
      <p>Community driven roadmaps, articles and resources for developers. <Link href="/signup"><a>Sign up</a></Link> for occasional updates on new roadmaps, updates and guides</p>
    </div>
  </HeroSectionWrap>
);

export default HeroSection;
