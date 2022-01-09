import React from 'react';
import { Box, Container, Image, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { getAllRoadmaps, getRoadmapById, isInteractiveRoadmap, RoadmapType } from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';
import { InteractiveRoadmapRenderer } from './interactive';

type RoadmapProps = {
  roadmap: RoadmapType;
};

function ImageRoadmap(props: RoadmapProps) {
  const { roadmap } = props;

  if (isInteractiveRoadmap(roadmap.id)) {
    return <InteractiveRoadmapRenderer roadmap={roadmap} />;
  }

  if (!roadmap.imageUrl) {
    return null;
  }

  return (
    <Container maxW={'900px'} position="relative">
      <Box mb="30px">
        <Image alt={roadmap.title} src={roadmap.imageUrl} />
      </Box>
    </Container>
  );
}

function TextualRoadmap(props: RoadmapProps) {
  const { roadmap } = props;
  if (!roadmap.landingPath) {
    return null;
  }

  // Remove trailing slashes
  const normalizedPath = roadmap.landingPath.replace(/^\//, '');
  const LandingContent = require(`../../content/${normalizedPath}`).default;

  return (
    <Container maxW={'container.md'} position="relative">
      <MdRenderer>
        <LandingContent />
      </MdRenderer>
    </Container>
  );
}

export default function Roadmap(props: RoadmapProps) {
  const { roadmap } = props;

  return (
    <Box bg="white" minH="100vh">
      <GlobalHeader />
      <Helmet
        title={roadmap?.seo?.title || roadmap.title}
        description={roadmap?.seo?.description || roadmap.description}
        keywords={roadmap?.seo.keywords || []}
        roadmap={roadmap}
      />
      <Box mb="60px">
        <RoadmapPageHeader roadmap={roadmap} />
        <ImageRoadmap roadmap={roadmap} />
        <TextualRoadmap roadmap={roadmap} />
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    roadmap: string;
  };
};

export async function getStaticPaths() {
  const roadmaps = getAllRoadmaps();
  const paramsList: StaticPathItem[] = roadmaps.map((roadmap) => ({
    params: { roadmap: roadmap.id },
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}

type ContextType = {
  params: {
    roadmap: string;
  };
};

export async function getStaticProps(context: ContextType) {
  const roadmapId: string = context?.params?.roadmap;

  return {
    props: {
      roadmap: getRoadmapById(roadmapId),
    },
  };
}
