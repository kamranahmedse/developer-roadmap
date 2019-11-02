import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebookSquare, faTwitterSquare, faTwitter, faHackerNewsSquare, faRedditSquare } from '@fortawesome/free-brands-svg-icons'
import { AuthorBio, AuthorImg, AuthorInfoWrap, AuthorMeta, ContributeIcon, FooterWrap, ShareIcons, ShareWrap, WrittenBy } from './style';


const GuideFooter = (props) => (
  <FooterWrap>
    <ShareWrap>
      <ContributeIcon>
        <a href="#">
          <span>Improve this Guide </span>
          <FontAwesomeIcon icon={ faGithub } />
        </a>
      </ContributeIcon>
      <ShareIcons>
        <span>Help spread the word</span>
        <a href="#"><FontAwesomeIcon icon={ faTwitterSquare } /></a>
        <a href="#"><FontAwesomeIcon icon={ faFacebookSquare } /></a>
        <a href="#"><FontAwesomeIcon icon={ faRedditSquare } /></a>
        <a href="#"><FontAwesomeIcon icon={ faHackerNewsSquare } /></a>
      </ShareIcons>
    </ShareWrap>
    <AuthorInfoWrap className="border-top">
      <AuthorImg src="/static/authors/kamranahmedse.jpeg" alt="" />
      <AuthorMeta>
        <WrittenBy>Written By</WrittenBy>
        <h4><a href="#">Kamran Ahmed</a></h4>
        <AuthorBio>Lead engineer at Tajawal. Created roadmap.sh. Lover of web and opensource</AuthorBio>
        <p className="social-links">
          <a href="#">
            <FontAwesomeIcon icon={ faTwitter } />
            Follow on Twitter
          </a>
          <a href="#">
            <FontAwesomeIcon icon={ faGithub } />
            Follow on GitHub
          </a>
        </p>
      </AuthorMeta>
    </AuthorInfoWrap>
  </FooterWrap>
);

export default GuideFooter;