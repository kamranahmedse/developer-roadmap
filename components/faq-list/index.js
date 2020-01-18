import { FaqContainer } from './style';
import MdRenderer from 'components/md-renderer';

const AboutPage = require(`../../content/pages/about.md`).default;

const FaqList = () => (
  <FaqContainer className='border-top bg-light'>
    <div className="container container-small">
      <MdRenderer>
        <AboutPage />
      </MdRenderer>
    </div>
  </FaqContainer>
);

export default FaqList;
