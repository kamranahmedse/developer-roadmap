import { Summary, SummaryContainer, UpcomingContainer } from './style';
import GuideBody from 'components/guide-body';
import RoadmapHeader from 'components/roadmap-header';
import SharePage from 'components/share-page';
import MdRenderer from 'components/md-renderer';

const RoadmapResources = ({ roadmap }) => {
  if (roadmap.upcoming) {
    return (
      <>
        <RoadmapHeader roadmap={ roadmap } />
        <UpcomingContainer>
          <GuideBody guide={{ fileName: 'upcoming' }} />
        </UpcomingContainer>
      </>
    );
  }

  const filePath = roadmap.resources.replace(/^\//, '');
  const ResourcesContent = require(`../../content/${filePath}`).default;

  return (
    <SummaryContainer>
      <RoadmapHeader roadmap={ roadmap } page='resources' />
      <Summary className="container">
        <MdRenderer>
          <ResourcesContent />
        </MdRenderer>
        <SharePage title={ roadmap.description } url={ roadmap.url } />
      </Summary>
    </SummaryContainer>
  )
};

export default RoadmapResources;
