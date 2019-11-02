import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { AuthorImg, FooterWrap, AuthorInfoWrap, WrittenBy, AuthorBio } from './style';


const GuideFooter = (props) => (
  <FooterWrap>
    <AuthorImg src="/static/authors/kamranahmedse.jpeg" alt="" />
    <AuthorInfoWrap>
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
      { /*<span className="social-icons">*/ }
      { /*<a href="#"><TwitterIcon /></a>*/ }
      { /*<a href="#"><GitHubIcon /></a>*/ }
      { /*</span>*/ }
    </AuthorInfoWrap>
  </FooterWrap>
);

export default GuideFooter;