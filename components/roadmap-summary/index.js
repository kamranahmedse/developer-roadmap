import {
  SummaryContainer,
  Title,
  Description,
  Image,
  Header,
  Summary,
} from './style';

const RoadmapSummary = ({ roadmap }) => (
  <SummaryContainer>
    <Header>
      <Title>{ roadmap.title }</Title>
      <Description>{ roadmap.description }</Description>
    </Header>
    <Summary className="border-top border-bottom">
      <div className="container">
        <Image src={ roadmap.picture } />
      </div>
    </Summary>
  </SummaryContainer>
);

export default RoadmapSummary;