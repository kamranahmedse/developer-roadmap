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
import SharePage from '../share-page';

const isActiveRoadmap = (loadedVersion, roadmapVersion) => (
  (loadedVersion === roadmapVersion) ||
  (loadedVersion === 'latest' && parseInt(roadmapVersion, 10) === (new Date()).getFullYear())
);

const RoadmapSummary = ({ roadmap }) => (
  <SummaryContainer>
    <Header>
      <Title>{ roadmap.title }</Title>
      <Description>{ roadmap.description }</Description>
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
      <div className="container">
        <Image src={ roadmap.picture } />
        <SharePage title={ roadmap.description } url={ roadmap.url } />
      </div>
    </Summary>
  </SummaryContainer>
);

export default RoadmapSummary;
