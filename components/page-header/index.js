import { HeaderWrap, Subtitle, Title } from './style';

const PageHeader = ({
  title,
  subtitle,
  children,
}) => (
  <HeaderWrap>
    <Title>{ title }</Title>
    <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />

    { children }
  </HeaderWrap>
);

export default PageHeader;
