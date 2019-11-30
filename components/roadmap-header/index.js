import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faEnvelope, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { BadgeLink, BadgesList, DarkBadge, PrimaryBadge, SecondaryBadge } from 'components/badges';
import siteConfig from "storage/site";
import { Description, Header, Title, VersionList } from './style';

const RoadmapHeader = ({ roadmap }) => (
  <Header className="border-bottom">
    <Title>{ roadmap.title }</Title>
    <Description>{ roadmap.description }</Description>
    <BadgesList className="mt-4">
      <BadgeLink href="/roadmaps">
        <DarkBadge>
          <FontAwesomeIcon icon={ faArrowLeft } />
          Other Roadmaps
        </DarkBadge>
      </BadgeLink>
      { roadmap.upcoming && (
        <SecondaryBadge>
          <FontAwesomeIcon icon={ faClock } />
          Upcoming Roadmap
        </SecondaryBadge>
      ) }
      { !roadmap.upcoming && (
        <BadgeLink href={ `${siteConfig.url.issue}?title=[${roadmap.title}] - Title Here` } target="_blank">
          <SecondaryBadge>
            <FontAwesomeIcon icon={ faHandshake } />
            Suggest Changes
          </SecondaryBadge>
        </BadgeLink>
      ) }

      <BadgeLink href="/signup">
        <PrimaryBadge>
          <FontAwesomeIcon icon={ faEnvelope } />
          Send me Updates
        </PrimaryBadge>
      </BadgeLink>
    </BadgesList>
  </Header>
);

export default RoadmapHeader;
