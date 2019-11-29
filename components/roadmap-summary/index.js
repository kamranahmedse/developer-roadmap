import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faEnvelope, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { Description, Header, Summary, SummaryContainer, Title, VersionList } from './style';
import SharePage from 'components/share-page';
import { BadgeLink, BadgesList, DarkBadge, PrimaryBadge, SecondaryBadge } from 'components/badges';
import GuideBody from 'components/guide-body';
import siteConfig from "storage/site";
import MdRenderer from '../md-renderer';

const UpcomingGuide = require(`../../storage/guides/upcoming.md`).default;

const RoadmapSummary = ({ roadmap }) => {
  return (
    <SummaryContainer>
      <Header>
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

        <VersionList className="border-bottom" />
      </Header>
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
            <div className="container">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae blanditiis commodi, consequatur, dicta distinctio esse et id, ipsa labore libero nisi odit placeat possimus saepe sed vel vitae voluptate?</p>
              <SharePage title={ roadmap.description } url={ roadmap.url } />
            </div>
          )
        }
      </Summary>
    </SummaryContainer>
  )
};

export default RoadmapSummary;
