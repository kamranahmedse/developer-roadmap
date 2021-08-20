import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { PageHeader } from '../../components/page-header';
import { RoadmapGridItem } from './components/roadmap-grid-item';

export default function Roadmaps() {
  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <PageHeader
          title={'Developer Roadmaps'}
          subtitle={'Step by step guides and paths to learn different tools or technologies'}
        />
        <Container maxW='container.md' position='relative'>
          <SimpleGrid columns={{ md: 2 }} mb='30px' spacing='15px'>
            <RoadmapGridItem
              colorIndex={0} title={'Frontend'}
              subtitle={'Step by step guide to becoming a frontend developer in 2021'}
              date={'June 12, 2021'}
            />
            <RoadmapGridItem
              colorIndex={1}
              title={'Backend'}
              subtitle={'Step by step guide to becoming a backend developer in 2021'}
              date='June 15, 2021'
            />

            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={2}
              title={'DevOps'}
              subtitle={'Step by step guide for DevOps or Operations role in 2021'}
            />

            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={3}
              title={'React'}
              subtitle={'Step by step guide to become a React Developer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={4}
              title={'DBA'}
              subtitle={'Step by step guide to becoming a PostgreSQL Database Administrator in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={5}
              title={'Android'}
              subtitle={'Step by step guide to become an Android Developer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={6}
              title={'QA Engineer'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={7}
              title={'AI Engineer'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={8}
              title={'iOS Engineer'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={9}
              title={'Golang'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={10}
              title={'Java'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
            <RoadmapGridItem
              date={'August 25, 2021'}
              colorIndex={10}
              title={'Angular'}
              subtitle={'Step by step guide to become a Quality Assurance Engineer in 2021'}
            />
          </SimpleGrid>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
