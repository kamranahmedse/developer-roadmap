import AboutHeader from '../../components/about-header';
import Footer from '../../components/footer';
import Header from '../../components/header';
import './style.scss';

const About = () => (
  <div className='home-container'>
    <Header />
    <AboutHeader />
    <div className="p-5 border-top border-bottom bg-light">

    </div>
    <Footer />
  </div>
);

export default About;