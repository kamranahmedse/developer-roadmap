import { Summary, SummaryContainer } from './style';
import SharePage from 'components/share-page';
import MdRenderer from 'components/md-renderer';

const UpcomingGuide = require(`../../storage/guides/upcoming.md`).default;

const RoadmapBody = ({ roadmap }) => {
  return (
    <SummaryContainer>
      <Summary>
        {
          roadmap.upcoming && (
            <div className="container container-small">
              <MdRenderer>
                <UpcomingGuide />
              </MdRenderer>
            </div>
          )
        }
        {
          !roadmap.upcoming && (
            <div className="container container-small text-left">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae blanditiis commodi, consequatur, dicta distinctio esse et id, ipsa labore libero nisi odit placeat possimus saepe sed vel vitae voluptate?</p>
              <SharePage title={ roadmap.description } url={ roadmap.url } />
            </div>
          )
        }
      </Summary>
    </SummaryContainer>
  )
};

export default RoadmapBody;
