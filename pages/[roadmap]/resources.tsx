import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';

type RoadmapProps = {
  roadmap: RoadmapType;
};

function RoadmapResources(props: RoadmapProps) {
  const { roadmap } = props;
  if (!roadmap.resourcesPath) {
    return null;
  }

  // Remove trailing slashes
  const normalizedPath = roadmap.resourcesPath.replace(/^\//, '');
  const RoadmapContent = require(`../../content/${normalizedPath}`).default;

  return (
    <Container maxW={'container.md'} position='relative'>
      <MdRenderer>
        <RoadmapContent />
      </MdRenderer>
    </Container>
  );
}

export default function Roadmap(props: RoadmapProps) {
  const { roadmap } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        title={roadmap?.seo?.title || roadmap.title}
        description={roadmap?.seo?.description || roadmap.description}
        keywords={roadmap?.seo.keywords || []}
      />
      <Box mb='60px'>
        <RoadmapPageHeader roadmap={roadmap} />
        <RoadmapResources roadmap={roadmap} />
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    roadmap: string
  }
};

export async function getStaticPaths() {
  const roadmaps = getAllRoadmaps();
  const paramsList: StaticPathItem[] = roadmaps.map(roadmap => ({
    params: { 'roadmap': roadmap.id }
  }));

  return {
    paths: paramsList,
    fallback: false
  };
}

type ContextType = {
  params: {
    roadmap: string
  }
};

export async function getStaticProps(context: ContextType) {
  const roadmapId: string = context?.params?.roadmap;

  return {
    props: {
      roadmap: getRoadmapById(roadmapId)
    }
  };
}
