import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faHackerNewsSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { ShareIcon, ShareIconsList, ShareWrap } from './style';

const ShareGuide = (props) => (
  <ShareWrap>
    <ShareIconsList className="d-sm-none d-md-none d-lg-flex d-xl-flex">
      <ShareIcon><a href="#"><FontAwesomeIcon icon={ faTwitterSquare } /></a></ShareIcon>
      <ShareIcon><a href="#"><FontAwesomeIcon icon={ faFacebookSquare } /></a></ShareIcon>
      <ShareIcon><a href="#"><FontAwesomeIcon icon={ faHackerNewsSquare } /></a></ShareIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default ShareGuide;