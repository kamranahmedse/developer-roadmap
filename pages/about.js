import AboutHeader from '../components/about-header/index';
import PageFooter from '../components/page-footer/index';
import PageHeader from '../components/page-header/index';
import DefaultLayout from '../layouts/default/index';
import FaqList from '../components/faq-list/index';

const About = () => (
  <DefaultLayout>
    <PageHeader />
    <AboutHeader />
    <FaqList />
    <PageFooter />
  </DefaultLayout>
);

export default About;