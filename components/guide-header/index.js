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
    </ActionItems>
  </HeaderWrap>
);

export default GuideHeader;
