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
import RoadmapGroup from './[group]';
import { ContentDrawer } from '../../components/roadmap/content-drawer';

type RoadmapProps = {
  roadmap: RoadmapType;
  json: any;
};

function RoadmapRenderer(props: RoadmapProps) {
  const { json, roadmap } = props;

  const roadmapRef = useRef(null);
  const [groupId, setGroupId] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'escape') {
        setGroupId('');
      }
    });

    window.addEventListener('click', (event: MouseEvent) => {
      const targetGroup = (event?.target as HTMLElement)?.closest('g');
      const groupId = targetGroup?.dataset?.groupId;
      if (!targetGroup || !groupId) {
        return;
      }

      // e.g. 100-internet:how-does-the-internet-work
      // will be translated to `internet:how-does-the-internet-work`
      setGroupId(groupId.replace(/^\d+-/, ''));
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
  } catch (e) {}

  return {
    props: {
      roadmap: getRoadmapById(roadmapId),
      json: roadmapJson,
    },
  };
}
