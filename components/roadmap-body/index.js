import { Summary, SummaryContainer, UpcomingContainer } from './style';
import SharePage from 'components/share-page';
import GuideBody from 'components/guide-body';

const RoadmapBody = ({ roadmap }) => {
  if (roadmap.upcoming) {
    return (
      <UpcomingContainer>
        <GuideBody guide={{ fileName: 'upcoming' }} />
      </UpcomingContainer>
    );
  }

  return (
    <SummaryContainer>
      <Summary>
        {
            <div className="container container-small text-left">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae blanditiis commodi, consequatur, dicta distinctio esse et id, ipsa labore libero nisi odit placeat possimus saepe sed vel vitae voluptate?</p>
              <SharePage title={ roadmap.description } url={ roadmap.url } />
            </div>
        }
      </Summary>
    </SummaryContainer>
  )
};

export default RoadmapBody;
