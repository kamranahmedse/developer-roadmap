import Header from '../../components/header/index';
import FeaturedContent from '../../components/featured-content';
import './style.scss';
import HeroSection from '../../components/hero-section';
import Footer from '../../components/footer';

const Home = (props) => (
  <div className='home-container'>
    <Header />
    <HeroSection />
    <div className="featured-content border-top border-bottom bg-light">
      <FeaturedContent />
    </div>
    <Footer />
  </div>
);

export default Home;