import FeaturedContent from 'components/featured-content/index';
import HeroSection from 'components/hero-section/index';
import PageFooter from 'components/page-footer/index';
import TopNav from 'components/top-nav';
import DefaultLayout from 'layouts/default/index';

const Home = (props) => (
  <DefaultLayout>
    <TopNav />
    <HeroSection />
    <FeaturedContent />
    <PageFooter />
  </DefaultLayout>
);

export default Home;
