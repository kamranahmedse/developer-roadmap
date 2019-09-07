import Header from '../../components/header/index';
import SwimLane from '../../components/swim-lane';
import './style.scss';
import HeroSection from '../../components/hero-section';

export const Home = (props) => (
  <div className='home-container'>
    <Header />
    <HeroSection />
    <div className="swim-lanes border-top border-bottom">
      <SwimLane />
    </div>
  </div>
);

export default Home;