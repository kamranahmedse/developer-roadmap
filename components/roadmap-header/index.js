import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faEnvelope, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { BadgeLink, BadgesList, DarkBadge, PrimaryBadge, SecondaryBadge } from 'components/badges';
import siteConfig from "content/site";
import { Description, Header, Title, VersionList } from './style';

const RoadmapHeader = ({ roadmap }) => (
  <Header className="border-bottom">
    <Title>{ roadmap.title }</Title>
    <Description>{ roadmap.description }</Description>
    <BadgesList className="mt-4">
      <BadgeLink href="/roadmaps">
        <DarkBadge>
          <FontAwesomeIcon className='d-none d-md-block' icon={ faArrowLeft } />
          Other Roadmaps
        </DarkBadge>
      </BadgeLink>
      { roadmap.upcoming && (
        <BadgeLink href="/signup">
          <SecondaryBadge>
            <FontAwesomeIcon className='d-none d-md-block' icon={ faClock } />
            Upcoming Roadmap
          </SecondaryBadge>
        </BadgeLink>
      ) }
      { !roadmap.upcoming && (
        <BadgeLink href={ `${siteConfig.url.issue}?title=[${roadmap.title}] - Title Here` } target="_blank" className='d-none d-md-block' >
          <SecondaryBadge>
            <FontAwesomeIcon icon={ faHandshake } />
            Suggest Changes
          </SecondaryBadge>
        </BadgeLink>
      ) }

      <BadgeLink href="/signup">
        <PrimaryBadge>
          <FontAwesomeIcon className='d-none d-md-block' icon={ faEnvelope } />
          Send me Updates
        </PrimaryBadge>
      </BadgeLink>
    </BadgesList>
  </Header>
);

export default RoadmapHeader;
