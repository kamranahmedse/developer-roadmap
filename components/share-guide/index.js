import { ShareWrap, HackerNewsIcon, ShareIcon, ShareIconsList } from './style';
import TwitterIcon from '../icons/twitter.svg';
import FacebookIcon from '../icons/facebook.svg';

const ShareGuide = (props) => (
  <ShareWrap>
    <ShareIconsList className="d-sm-none d-md-none d-lg-flex d-xl-flex">
      <ShareIcon><a href="#"><TwitterIcon /></a></ShareIcon>
      <ShareIcon><a href="#"><FacebookIcon /></a></ShareIcon>
      <HackerNewsIcon href="#">Y</HackerNewsIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default ShareGuide;