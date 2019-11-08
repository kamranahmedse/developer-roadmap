import AboutHeader from 'components/about-header/index';
import PageFooter from 'components/page-footer/index';
import TopNav from 'components/top-nav';
import DefaultLayout from 'layouts/default/index';
import FaqList from 'components/faq-list/index';

const About = () => (
  <DefaultLayout>
    <TopNav />
    <AboutHeader />
    <FaqList />
    <PageFooter />
  </DefaultLayout>
);

export default About;
