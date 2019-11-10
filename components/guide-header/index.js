import formatDate from 'date-fns/format'
import {
  ActionItems,
  AuthorImage,
  EditGuide,
  GuideAuthor,
  GuideDate,
  GuideMeta,
  GuideSubtitle,
  GuideTitle,
  HeaderWrap,
} from './style';
import { getContributionUrl } from "lib/guide";
import { getTwitterUrl } from "lib/url";
import { faClock, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BadgeLink, BadgesList, PrimaryBadge, SecondaryBadge, DarkBadge } from 'components/badges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GuideHeader = ({
 guide,
 guide: {
   author = {}
 } = {}
}) => (
  <HeaderWrap className="border-bottom">
    <GuideMeta>
      <GuideAuthor href={ getTwitterUrl(author.twitter) } target="_blank">
        <AuthorImage src={ author.picture } />
        { author.name }
      </GuideAuthor>
      &middot;
      <GuideDate>{ formatDate(new Date(guide.createdAt), 'EEEE, MMMM d yyyy') }</GuideDate>
      &middot;
      <EditGuide href={ getContributionUrl(guide) } target="_blank">Improve this Guide</EditGuide>
    </GuideMeta>
    <GuideTitle>{ guide.title }</GuideTitle>
    <GuideSubtitle>{ guide.description }</GuideSubtitle>
    <ActionItems>
      <BadgesList className="mt-4">
        <BadgeLink href="/guides">
          <SecondaryBadge>
            <FontAwesomeIcon icon={faArrowLeft}/>
            Other Guides
          </SecondaryBadge>
        </BadgeLink>
        <BadgeLink href="/signup">
          <PrimaryBadge>
            <FontAwesomeIcon icon={faEnvelope}/>
            Send me Updates
          </PrimaryBadge>
        </BadgeLink>
      </BadgesList>
    </ActionItems>
  </HeaderWrap>
);

export default GuideHeader;
