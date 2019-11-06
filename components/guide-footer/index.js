import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGithub, faHackerNewsSquare, faRedditSquare, faTwitter, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { AuthorBio, AuthorImg, AuthorInfoWrap, AuthorMeta, ContributeIcon, FooterBg, FooterContainer, FooterWrap, ShareIcons, ShareWrap } from './style';
import { getContributionUrl } from "../../lib/guide";


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
            <a href={ author.twitter } target="_blank">
              <span className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline">Follow the author </span>
              <span className="d-inline d-sm-inline d-md-none d-lg-none d-xl-none">Author </span>
              <FontAwesomeIcon icon={faTwitter}/>
            </a>
          </ContributeIcon>
          <ShareIcons>
            <span className="d-none d-sm-none d-md-none d-lg-inline d-xl-inline">Help spread the word</span>
            <span className="d-inline d-sm-inline d-md-inline d-lg-none d-xl-none">Share</span>
            <a href="#"><FontAwesomeIcon icon={faTwitterSquare}/></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookSquare}/></a>
            <a href="#"><FontAwesomeIcon icon={faRedditSquare}/></a>
            <a href="#"><FontAwesomeIcon icon={faHackerNewsSquare}/></a>
          </ShareIcons>
        </ShareWrap>
      </FooterContainer>
    </FooterBg>

    <FooterBg className="border-top">
      <FooterContainer>
        <AuthorInfoWrap>
          <AuthorImg src={ author.picture } alt={ author.name }/>
          <AuthorMeta>
            <h4><a href={ author.twitter } target="_blank">{ author.name }</a></h4>
            <AuthorBio>{ author.bio }</AuthorBio>
          </AuthorMeta>
        </AuthorInfoWrap>
      </FooterContainer>
    </FooterBg>
  </FooterWrap>
);

export default GuideFooter;
