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
      <ShareIcon>
        <a href={ getTwitterShareUrl({ text: `${guide.title} by @${author.twitter}`, url: guide.url })} target="_blank">
          <FontAwesomeIcon icon={ faTwitterSquare } />
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={ getFacebookShareUrl({ text: guide.title, url: guide.url }) } target="_blank">
          <FontAwesomeIcon icon={ faFacebookSquare } />
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={ getRedditShareUrl({ text: guide.title, url: guide.url })} target="_blank">
          <FontAwesomeIcon icon={ faRedditSquare } />
        </a>
      </ShareIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default ShareGuide;
