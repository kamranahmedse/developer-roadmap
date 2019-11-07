import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { getFacebookShareUrl, getRedditShareUrl, getTwitterShareUrl } from "lib/url";
import { ShareIcon, ShareIconsList, ShareWrap } from './style';

const ShareGuide = ({
  guide,
  guide: {
    author = {}
  } = {}
}) => (
  <ShareWrap>
    <ShareIconsList className="d-sm-none d-md-none d-lg-flex d-xl-flex">
      <ShareIcon href={ getTwitterShareUrl({ text: `${guide.title} by @${author.twitter}`, url: guide.url })} target="_blank">
          <FontAwesomeIcon icon={ faTwitterSquare } />
      </ShareIcon>
      <ShareIcon href={ getFacebookShareUrl({ text: guide.title, url: guide.url }) } target="_blank">
        <FontAwesomeIcon icon={ faFacebookSquare } />
      </ShareIcon>
      <ShareIcon href={ getRedditShareUrl({ text: guide.title, url: guide.url })} target="_blank">
        <FontAwesomeIcon icon={ faRedditSquare } />
      </ShareIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default ShareGuide;
