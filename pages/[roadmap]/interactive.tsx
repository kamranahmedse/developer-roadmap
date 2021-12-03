import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import Helmet from '../../components/helmet';
import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from '../../lib/renderer';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';

type RoadmapProps = {
  roadmap: RoadmapType;
  json: any;
};

function RoadmapRenderer(props: RoadmapProps) {
  const { json, roadmap } = props;

  const roadmapRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.addEventListener('click', (event: MouseEvent) => {
      const targetGroup = (event?.target as HTMLElement)?.closest('g');
      const groupName = targetGroup?.dataset?.groupName;
      if (!targetGroup || !groupName) {
        return;
      }

      alert(groupName);
    });
  });

  useEffect(() => {
    wireframeJSONToSVG(json)
      .then((svgElement) => {
        const container: HTMLElement = roadmapRef.current!;
        if (!container) {
          return;
        }

        if (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        container.appendChild(svgElement);
      })
      .catch((err) => {
        setHasError(true);
      });
  }, [json]);

  return (
    <Container maxW={'container.lg'} position="relative">
      <div ref={roadmapRef} />
    </Container>
  );
}

export default function InteractiveRoadmap(props: RoadmapProps) {
  const { roadmap, json } = props;

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
        <RoadmapRenderer json={json} roadmap={roadmap} />
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

  let roadmapJson = {};
  try {
    roadmapJson = require(`../../public/project/${roadmapId}.json`);
  } catch (e) {
  }

  return {
    props: {
      roadmap: getRoadmapById(roadmapId),
      json: roadmapJson,
    },
  };
}
