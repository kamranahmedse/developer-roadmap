import Link from 'next/link';
import classNames from 'classnames';
import {
  SummaryContainer,
  Title,
  Description,
  Image,
  Header,
  Summary,
  VersionLink,
  VersionList,
} from './style';
import SharePage from 'components/share-page';
import { BadgeLink, BadgesList, PrimaryBadge, SecondaryBadge } from 'components/badges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClock, faHandshake } from '@fortawesome/free-solid-svg-icons';
import GuideBody from 'components/guide-body';
import siteConfig from "data/site";

const isActiveRoadmap = (loadedVersion, roadmapVersion) => (
  (loadedVersion === roadmapVersion) ||
  (loadedVersion === 'latest' && parseInt(roadmapVersion, 10) === (new Date()).getFullYear())
);

const UpcomingGuide = require(`../../data/roadmaps/upcoming.md`).default;

const RoadmapSummary = ({ roadmap }) => (
  <SummaryContainer>
    <Header>
      <Title>{ roadmap.title }</Title>
      <Description>{ roadmap.description }</Description>

      <BadgesList className="mt-4">
        { roadmap.upcoming && (
          <SecondaryBadge>
            <FontAwesomeIcon icon={faClock}/>
            Upcoming Roadmap
          </SecondaryBadge>
        ) }
        { !roadmap.upcoming && (
          <BadgeLink href={`${siteConfig.url.issue}?title=[${roadmap.title}] - Title Here`} target="_blank">
            <SecondaryBadge>
              <FontAwesomeIcon icon={faHandshake}/>
              Suggest Improvements
            </SecondaryBadge>
          </BadgeLink>
        ) }

        <BadgeLink href="/signup">
          <PrimaryBadge>
            <FontAwesomeIcon icon={faEnvelope}/>
            Send me Updates
          </PrimaryBadge>
        </BadgeLink>
      </BadgesList>

      <VersionList className="border-bottom">
        { (roadmap.versions || []).map(versionItem => (
          <Link href={ `${roadmap.url}/${versionItem}` } passHref key={ versionItem }>
            <VersionLink className={ classNames({
              active: isActiveRoadmap(versionItem, roadmap.version),
            }) }>{ versionItem } Version</VersionLink>
          </Link>
        )) }
      </VersionList>
    </Header>
    <Summary>
      {
        roadmap.upcoming && (
          <GuideBody>
            <UpcomingGuide />
          </GuideBody>
        )
      }
      {
        !roadmap.upcoming && (
          <div className="container">
            <Image src={ roadmap.picture } />
            <SharePage title={ roadmap.description } url={ roadmap.url } />
          </div>
        )
      }
    </Summary>
  </SummaryContainer>
);

export default RoadmapSummary;
