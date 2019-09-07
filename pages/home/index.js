import Header from '../../components/header/index';
import SwimLane from '../../components/swim-lane';
import './style.scss';
import HeroSection from '../../components/hero-section';

export const Home = (props) => (
  <div className='home-container'>
    <Header />
    <HeroSection />
    <div className="swim-lanes bg-light">
      <div className="container">
        <SwimLane />
      </div>
    </div>
  </div>
);

export default Home;