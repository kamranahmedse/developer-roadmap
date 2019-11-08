import { HeaderWrap, Subtitle, Title } from './style';

const PageHeader = (props) => (
  <HeaderWrap>
    <Title>Developer Roadmaps</Title>
    <Subtitle>We continue to improve these roadmaps and add new ones, subscribe to get occasional updates</Subtitle>
    { props.children }
  </HeaderWrap>
);

export default PageHeader;
