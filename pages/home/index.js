import FeaturedContent from '../../components/featured-content';
import HeroSection from '../../components/hero-section';
import PageFooter from '../../components/page-footer';
import PageHeader from '../../components/page-header';
import DefaultLayout from '../../layouts/default';
import { FeaturedWrap } from './style';


const Home = (props) => (
  <DefaultLayout>
    <PageHeader />
    <HeroSection />
    <FeaturedWrap className="border-top border-bottom bg-light">
      <FeaturedContent />
    </FeaturedWrap>
    <PageFooter />
  </DefaultLayout>
);

export default Home;