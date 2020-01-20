import { HeaderWrap, Subtitle, Title, Logo } from './style';

const PageLogoHeader = ({ title, subtitle, children, }) => (
  <HeaderWrap>
    <Logo src='/brand.png' alt='' />
    <Title>{ title }</Title>
    <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />

    { children }
  </HeaderWrap>
);

export default PageLogoHeader;
