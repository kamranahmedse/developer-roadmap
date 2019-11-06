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

const GuideHeader = ({
 guide,
 guide: {
   author = {}
 } = {}
}) => (
  <HeaderWrap className="border-bottom">
    <GuideMeta>
      <GuideAuthor href={ author.twitter } target="_blank">
        <AuthorImage src={ author.picture } />
        { author.name }
      </GuideAuthor>
      &middot;
      <GuideDate>{ guide.createdAt }</GuideDate>
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
