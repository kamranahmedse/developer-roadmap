import { AuthorImage, GuideAuthor, GuideDate, GuideMeta, GuideSubtitle, GuideTitle, HeaderWrap } from './style';

const GuideHeader = (props) => (
  <HeaderWrap className="border-bottom">
    <GuideMeta>
      <GuideAuthor href="https://github.com/kamranahmedse" target="_blank">
        <AuthorImage src="/static/authors/kamranahmedse.jpeg" />
        Kamran Ahmed
      </GuideAuthor>
      &middot;
      <GuideDate>Wednesday, October 9th 2019</GuideDate>
    </GuideMeta>
    <GuideTitle>Design Patterns for Humans</GuideTitle>
    <GuideSubtitle>An ultra-simplified explanation to design patterns</GuideSubtitle>
  </HeaderWrap>
);

export default GuideHeader;