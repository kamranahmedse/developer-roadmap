import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGithub, faHackerNewsSquare, faRedditSquare, faTwitter, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { getContributionUrl } from "lib/guide";
import {
  getTwitterUrl,
  getTwitterShareUrl,
  getFacebookShareUrl,
  getRedditShareUrl,
  getHnShareUrl
} from "lib/url";
import {
  AuthorBio,
  AuthorImg,
  AuthorInfoWrap,
  AuthorMeta,
  ContributeIcon,
  FooterBg,
  FooterContainer,
  FooterWrap,
  ShareIcons,
  ShareWrap
} from './style';


const GuideFooter = ({
  guide,
  guide: {
    author = {}
  } = {}
}) => (
  <FooterWrap>
    <FooterBg className="border-top">
      <FooterContainer>
        <ShareWrap>
          <ContributeIcon>
            <a href={ getContributionUrl(guide) } target="_blank">
              <span className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline">Improve this Guide </span>
              <span className="d-inline d-sm-inline d-md-none d-lg-none d-xl-none">Contribute </span>
              <FontAwesomeIcon icon={faGithub}/>
            </a>
          </ContributeIcon>
          <ContributeIcon hasMargins>
            <a href={ getTwitterUrl(author.twitter) } target="_blank">
              <span className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline">Follow the author </span>
              <span className="d-inline d-sm-inline d-md-none d-lg-none d-xl-none">Author </span>
              <FontAwesomeIcon icon={faTwitter}/>
            </a>
          </ContributeIcon>
          <ShareIcons>
            <span className="d-none d-sm-none d-md-none d-lg-inline d-xl-inline">Help spread the word</span>
            <span className="d-inline d-sm-inline d-md-inline d-lg-none d-xl-none">Share</span>
            <a href={ getTwitterShareUrl({ text: `${guide.title} by @${author.twitter}`, url: guide.url })} target="_blank">
              <FontAwesomeIcon icon={faTwitterSquare}/>
            </a>
            <a href={ getFacebookShareUrl({ text: guide.title, url: guide.url }) } target="_blank">
              <FontAwesomeIcon icon={faFacebookSquare}/>
            </a>
            <a href={ getRedditShareUrl({ text: guide.title, url: guide.url })} target="_blank">
              <FontAwesomeIcon icon={faRedditSquare}/>
            </a>
            <a href={ getHnShareUrl({ text: guide.title, url: guide.url })} target="_blank">
              <FontAwesomeIcon icon={faHackerNewsSquare}/>
            </a>
          </ShareIcons>
        </ShareWrap>
      </FooterContainer>
    </FooterBg>

    <FooterBg className="border-top">
      <FooterContainer>
        <AuthorInfoWrap>
          <AuthorImg src={ author.picture } alt={ author.name }/>
          <AuthorMeta>
            <h4><a href={ getTwitterUrl(author.twitter) } target="_blank">{ author.name }</a></h4>
            <AuthorBio>{ author.bio }</AuthorBio>
          </AuthorMeta>
        </AuthorInfoWrap>
      </FooterContainer>
    </FooterBg>
  </FooterWrap>
);

export default GuideFooter;
