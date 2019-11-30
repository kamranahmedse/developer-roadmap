import { PageHeader, RoadmapMeta, ShareRoadmap, Sidebar, Summary, SummaryContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { getFacebookShareUrl } from 'lib/url';
import { ShareIcon } from 'components/share-icon';
import { getRedditShareUrl, getTwitterShareUrl } from 'lib/url';
import siteConfig from "storage/site";

const DetailedRoadmap = ({ roadmap }) => {
  const roadmapPages = Object.keys(roadmap.sidebar || {}).map(groupTitle => {
    return (
      <div className='links-group'>
        <h3>{ groupTitle }</h3>
        <ul>
          { roadmap.sidebar[groupTitle].map(page => {
            return (
              <li>
                <a href={ page.url }>
                  <span className="bullet"></span>
                  { page.title }
                </a>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  });

  return (
    <SummaryContainer>
      <PageHeader className="border-top border-bottom text-center text-md-left">
        <div className="container d-flex align-items-center flex-column flex-md-row">
          <RoadmapMeta>
            <h3>{ roadmap.title }</h3>
            <p>Roadmap contributed by <a href="#">Kamran Ahmed</a> and <a href="#">5 others</a></p>
          </RoadmapMeta>
          <ShareRoadmap className="mt-2 mt-md-0">
            <ShareIcon href={ siteConfig.url.repo } target="_blank">
              <FontAwesomeIcon icon={ faGithubSquare } />
            </ShareIcon>
            <ShareIcon href={ getFacebookShareUrl({ text: roadmap.title, url: roadmap.url }) } target="_blank">
              <FontAwesomeIcon icon={ faFacebookSquare } />
            </ShareIcon>
            <ShareIcon href={ getTwitterShareUrl({ text: roadmap.title, url: roadmap.url }) } target="_blank">
              <FontAwesomeIcon icon={ faTwitterSquare } />
            </ShareIcon>
            <ShareIcon href={ getRedditShareUrl({ text: roadmap.title, url: roadmap.url }) } target="_blank">
              <FontAwesomeIcon icon={ faRedditSquare } />
            </ShareIcon>
          </ShareRoadmap>
        </div>
      </PageHeader>
      <Summary className="container">
        <Sidebar className="sidebar">
          { roadmapPages }
        </Sidebar>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae blanditiis commodi, consequatur, dicta distinctio esse et id, ipsa labore libero nisi odit placeat possimus saepe sed vel vitae voluptate?</p>
        </div>
      </Summary>
    </SummaryContainer>
  )
};

export default DetailedRoadmap;
