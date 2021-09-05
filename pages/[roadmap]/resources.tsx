import { Box, Button, Container, Link, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, AtSignIcon, DownloadIcon } from '@chakra-ui/icons';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { PageHeader } from '../../components/page-header';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';

type RoadmapProps = {
  roadmap: RoadmapType;
};

function TextualRoadmap(props: RoadmapProps) {
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
        <PageHeader
          title={roadmap.title}
          subtitle={roadmap.description}
        >
          <Stack mt='20px' isInline>
            <Button d={['none', 'flex']} as={Link} href={'/roadmaps'} size='xs' py='14px' px='10px'
                    leftIcon={<ArrowBackIcon />}
                    colorScheme='teal' variant='solid' _hover={{ textDecoration: 'none' }}>
              All Roadmaps
            </Button>

            {roadmap.pdfUrl && (
              <Button as={Link}
                      href={roadmap.pdfUrl}
                      target='_blank'
                      size='xs'
                      py='14px'
                      px='10px'
                      leftIcon={<DownloadIcon />}
                      colorScheme='yellow'
                      variant='solid'
                      _hover={{ textDecoration: 'none' }}>
                Download PDF
              </Button>
            )}
            <Button as={Link} href={'/signup'} size='xs' py='14px' px='10px' leftIcon={<AtSignIcon />}
                    colorScheme='yellow' variant='solid' _hover={{ textDecoration: 'none' }}>
              Subscribe
            </Button>
          </Stack>
        </PageHeader>

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
