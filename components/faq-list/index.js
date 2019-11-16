import { FaqContainer } from './style';
import GuideBody from 'components/guide-body';

const AboutPage = require(`../../storage/pages/about.md`).default;

const FaqList = () => (
  <FaqContainer className='border-top bg-light'>
    <div className="container container-small">
      <GuideBody>
        <AboutPage />
      </GuideBody>
    </div>
  </FaqContainer>
);

export default FaqList;
