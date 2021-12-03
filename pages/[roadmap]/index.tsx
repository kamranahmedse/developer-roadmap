import {
  Box,
  Button,
  Text,
  Container,
  Link,
  Stack,
  Badge,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  AtSignIcon,
  DownloadIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { PageHeader } from '../../components/page-header';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';
import siteConfig from '../../content/site.json';
import React from 'react';
import { event } from '../../lib/gtag';
import { NewAlertBanner } from '../../components/roadmap/new-alert-banner';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';

type RoadmapProps = {
  roadmap: RoadmapType;
};

function ImageRoadmap(props: RoadmapProps) {
  const { roadmap } = props;
  if (!roadmap.imagePath) {
    return null;
  }

  return (
    <Container maxW={'900px'} position="relative">
      <Box mb="30px">
        <img alt="Frontend Roadmap" src={roadmap.imagePath} />
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
