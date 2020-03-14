import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faHackerNewsSquare, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import { getFacebookShareUrl, getHnShareUrl, getRedditShareUrl, getTwitterShareUrl } from 'lib/url';
import { ShareIconsList, ShareWrap } from './style';
import { ShareIcon } from 'components/share-icon';

const SharePage = ({
  url,
  title,
  twitterUsername,
}) => (
  <ShareWrap>
    <ShareIconsList className="d-none d-sm-flex">
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
      <ShareIcon href={ getHnShareUrl({ text: title, url: url })} target="_blank">
        <FontAwesomeIcon icon={faHackerNewsSquare}/>
      </ShareIcon>
      <ShareIcon href={ getRedditShareUrl({ text: title, url: url })} target="_blank">
        <FontAwesomeIcon icon={ faRedditSquare } />
      </ShareIcon>
    </ShareIconsList>
  </ShareWrap>
);

export default SharePage;
