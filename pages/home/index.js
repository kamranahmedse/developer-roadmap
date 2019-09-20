import FeaturedContent from '../../components/featured-content';
import HeroSection from '../../components/hero-section';
import PageFooter from '../../components/page-footer';
import PageHeader from '../../components/page-header';
import './style.scss';

const Home = (props) => (
  <div className='home-container'>
    <PageHeader />
    <HeroSection />
    <div className="featured-content border-top border-bottom bg-light">
      <FeaturedContent />
    </div>
    <PageFooter />
  </div>
);

export default Home;