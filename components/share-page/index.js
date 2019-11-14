import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { getFacebookShareUrl, getRedditShareUrl, getTwitterShareUrl } from "lib/url";
import { ShareIcon, ShareIconsList, ShareWrap } from './style';

const SharePage = ({
  url,
  title,
  twitterUsername,
}) => (
  <ShareWrap>
    <ShareIconsList className="d-sm-none d-md-none d-lg-flex d-xl-flex">
      <ShareIcon
        href={ getTwitterShareUrl({
          text: `${title} ${twitterUsername ? `by @${twitterUsername}` : ''}`,
          url: url
        })}
        target="_blank"
      >
          <FontAwesomeIcon icon={ faTwitterSquare } />
      </ShareIcon>
      <ShareIcon href={ getFacebookShareUrl({ text: title, url: url }) } target="_blank">
        <FontAwesomeIcon icon={ faFacebookSquare } />
      </ShareIcon>
      <ShareIcon href={ getRedditShareUrl({ text: title, url: url })} target="_blank">
        <FontAwesomeIcon icon={ faRedditSquare } />
      </ShareIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default SharePage;
