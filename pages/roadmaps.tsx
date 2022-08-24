import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import { PageHeader } from '../components/page-header';
import { RoadmapGridItem } from '../components/roadmap/roadmap-grid-item';
import { getAllRoadmaps, RoadmapType } from '../lib/roadmap';
import Helmet from '../components/helmet';
import { NewAlertBanner } from '../components/roadmap/new-alert-banner';

type RoadmapsProps = {
  roadmaps: RoadmapType[];
};

export default function Roadmaps(props: RoadmapsProps) {
  const { roadmaps } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        title={'Developer Roadmaps'}
        description={'Step by step guides and paths to learn different tools or technologies'}
      />
      <Box mb='60px'>
        <PageHeader
          beforeTitle={<NewAlertBanner />}
          title={'Developer Roadmaps'}
          subtitle={'Step by step guides and paths to learn different tools or technologies'}
        />
        <Container maxW='container.md' position='relative'>
          <SimpleGrid columns={[1, 1, 2, 2]} mb='30px' spacing={['10px', '10px', '15px']}>
            {roadmaps.map((roadmap, counter) => (
              <RoadmapGridItem
                key={roadmap.id}
                href={`/${roadmap.id}`}
                colorIndex={counter}
                title={roadmap.featuredTitle}
                subtitle={roadmap.description}
                isCommunity={roadmap.isCommunity}
                isUpcoming={roadmap.isUpcoming}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roadmaps: getAllRoadmaps()
    }
  };
}
