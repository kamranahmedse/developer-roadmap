import { Summary, SummaryContainer, UpcomingContainer } from './style';
import GuideBody from 'components/guide-body';
import RoadmapHeader from 'components/roadmap-header';
import SharePage from 'components/share-page';
import MdRenderer from 'components/md-renderer';

const RoadmapSummary = ({ roadmap }) => {
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

  const filePath = roadmap.path.replace(/^\//, '');
  const RoadmapContent = require(`../../storage/${filePath}`).default;

  return (
    <SummaryContainer>
      <RoadmapHeader roadmap={ roadmap } />
      <Summary className="container">
        <MdRenderer>
          <RoadmapContent />
        </MdRenderer>
        <SharePage title={ roadmap.description } url={ roadmap.url } />
      </Summary>
    </SummaryContainer>
  )
};

export default RoadmapSummary;
