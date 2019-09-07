import Header from '../../components/header/index';
import FeaturedContent from '../../components/featured-content';
import './style.scss';
import HeroSection from '../../components/hero-section';

export const Home = (props) => (
  <div className='home-container'>
    <Header />
    <HeroSection />
    <div className="swim-lanes border-top border-bottom">
      <FeaturedContent />
    </div>
  </div>
);

export default Home;