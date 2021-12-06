import { Box, Container, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import Helmet from '../../components/helmet';
import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from '../../lib/renderer';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';
import { ContentDrawer } from '../../components/roadmap/content-drawer';
import { useFetch } from 'use-http';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;

type RoadmapProps = {
  roadmap: RoadmapType;
};

function RoadmapLoader() {
  return (
    <Container
      maxW={'container.md'}
      position="relative"
      mt="60px"
      textAlign="center"
    >
      <Spinner
        thickness="7px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Container>
  );
}

function RoadmapRenderer(props: RoadmapProps) {
  const { roadmap } = props;

  const { loading: isLoading, error, get } = useFetch();

  const roadmapRef = useRef(null);

  const [isRendering, setIsRendering] = useState(false);
  const [roadmapJson, setRoadmapJson] = useState(null);
  const [groupId, setGroupId] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    get(`/project/${roadmap.id}.json`)
      .then((roadmapJson) => {
        setRoadmapJson(roadmapJson);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      });
  }, [get, roadmap.id]);

  // Event bindings for the roadmap interactivity
  useEffect(() => {
    function keydownListener(event: KeyboardEvent) {
      if (event.key.toLowerCase() === 'escape') {
        setGroupId('');
      }
    }

    function clickListener(event: MouseEvent) {
      const targetGroup = (event?.target as HTMLElement)?.closest('g');
      const groupId = targetGroup?.dataset?.groupId;
      if (!targetGroup || !groupId) {
        return;
      }

      if (groupId.startsWith('ext_link:')) {
        window.open(`https://${groupId.replace('ext_link:', '')}`);
        return;
      }

      // e.g. 100-internet:how-does-the-internet-work
      // will be translated to `internet:how-does-the-internet-work`
      setGroupId(groupId.replace(/^\d+-/, ''));
    }

    window.addEventListener('keydown', keydownListener);
    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('click', clickListener);
    };
  }, []);

  useEffect(() => {
    if (!roadmapJson) {
      return;
    }

    setIsRendering(true);
    wireframeJSONToSVG(roadmapJson)
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
      })
      .finally(() => {
        setIsRendering(false);
      });
  }, [roadmapJson]);

  return (
    <Container maxW={'container.lg'} position="relative">
      {(isLoading || isRendering) && <RoadmapLoader /> }
      <ContentDrawer
        roadmap={roadmap}
        groupId={groupId}
        onClose={() => setGroupId('')}
      />

      <div ref={roadmapRef} />
    </Container>
  );
}

export default function InteractiveRoadmap(props: RoadmapProps) {
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
        <RoadmapRenderer roadmap={roadmap} />
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
