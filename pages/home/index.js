import Header from '../../components/header/index';
import SwimLane from '../../components/swim-lane';
import './style.scss';
import HeroSection from '../../components/hero-section';

export const Home = (props) => (
  <div className='home-container'>
    <Header />
    <HeroSection />
    <div className="container">
      <div className="swim-lanes">
        <SwimLane />
      </div>
    </div>
  </div>
);

export default Home;