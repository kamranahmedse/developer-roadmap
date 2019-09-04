import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const HeroSection = () => (
  <div className='hero-section'>
    <h1>Developer Roadmaps</h1>
    <p>Community driven, roadmaps, articles and resources for developers</p>

    <div className="register-form">
      <input type="text" className='email-input' placeholder='Enter Email Address' />
      <a href="#" className="btn btn-dark">Register</a>
      <a href="#" className='icon-link'><FontAwesomeIcon icon={ ["fab", "github"] } /></a>
      <a href="#" className='icon-link'><FontAwesomeIcon icon={ ["fab", "twitter"] } /></a>
    </div>
  </div>
);

export default HeroSection;