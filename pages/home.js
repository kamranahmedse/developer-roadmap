import FeaturedContent from '../components/featured-content/index';
import HeroSection from '../components/hero-section/index';
import PageFooter from '../components/page-footer/index';
import PageHeader from '../components/page-header/index';
import DefaultLayout from '../layouts/default/index';

const Home = (props) => (
  <DefaultLayout>
    <PageHeader />
    <HeroSection />
    <FeaturedContent />
    <PageFooter />
  </DefaultLayout>
);

export default Home;