import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { getAllRoadmaps, getRoadmapById, RoadmapType } from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';
import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import siteConfig from '../../content/site.json';
import { EditContentPageLink } from '../../components/roadmap/edit-content-page-link';

type RoadmapProps = {
  roadmap: RoadmapType;
  group: string;
  isOutlet?: boolean;
};

// @todo error handling
function TextualContent(props: RoadmapProps) {
  const { roadmap, group } = props;
  if (!roadmap.contentPathsFilePath) {
    return null;
  }

  // Remove trailing slashes
  const contentsPathsFilePath = roadmap.contentPathsFilePath.replace(/^\//, '');
  const contentPathMapping = require(`../../content/${contentsPathsFilePath}`);


  const contentFilePath = contentPathMapping[group] || '';
  const normalizedContentFilePath = contentFilePath.replace(/^\//, '');

  const GroupContent = require(`../../content/${normalizedContentFilePath}`).default;

  return (
    <Box>
      <MdRenderer>
        <GroupContent />
        <EditContentPageLink
          href={`${siteConfig.url.repoData}/${normalizedContentFilePath}`}
        />
      </MdRenderer>
    </Box>
  );
}

function RoadmapBreadcrumb(props: RoadmapProps) {
  const { roadmap, group } = props;

  const groupParts = group.split(':');

  return (
    <Breadcrumb
      fontWeight="medium"
      fontSize="sm"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink color="blue.500" href={`/${roadmap.id}`}>
          {roadmap.featuredTitle}
        </BreadcrumbLink>
      </BreadcrumbItem>

      {groupParts.map((groupPart: string, counter: number) => (
        <BreadcrumbItem
          key={groupPart}
          isCurrentPage={counter === groupParts.length - 1}
        >
          <BreadcrumbLink
            textTransform="capitalize"
            color="blue.500"
            href={`/${roadmap.id}/${groupParts
              .slice(0, counter + 1)
              .join(':')}`}
          >
            {groupPart.split('-').join(' ')}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default function RoadmapGroup(props: RoadmapProps) {
  const { roadmap, group, isOutlet = false } = props;

  if (isOutlet) {
    return <TextualContent roadmap={roadmap} group={group} />;
  }

  return (
    <Box bg="white" minH="100vh">
      <GlobalHeader />
      <Helmet
        title={roadmap?.seo?.title || roadmap.title}
        description={roadmap?.seo?.description || roadmap.description}
        keywords={roadmap?.seo.keywords || []}
      />
      <Container my={'60px'} maxW={'container.md'} position="relative">
        <RoadmapBreadcrumb roadmap={roadmap} group={group} />
        <TextualContent roadmap={roadmap} group={group} />
      </Container>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    roadmap: string;
    group: string;
  };
};

export async function getStaticPaths() {
  const roadmaps = getAllRoadmaps();

  // Return all the groups from here
  const paramsList: StaticPathItem[] = roadmaps.flatMap((roadmap) => {
    if (roadmap.contentPathsFilePath) {
      const normalizedPath = roadmap.contentPathsFilePath.replace(/^\/+?/, '');
      const contentPaths = require(`../../content/${normalizedPath}`);
      const groupNames = Object.keys(contentPaths);

      // For each of the group names, return the param list
      return groupNames.map((groupName: string) => ({
        params: {
          roadmap: roadmap.id,
          group: groupName,
        },
      }));
    }

    return {
      params: {
        roadmap: roadmap.id,
        group: roadmap.id,
      },
    };
  });

  return {
    paths: paramsList,
    fallback: false,
  };
}

type ContextType = {
  params: {
    roadmap: string;
    group: string;
  };
};

export async function getStaticProps(context: ContextType) {
  const roadmapId: string = context?.params?.roadmap;
  const groupId: string = context?.params?.group;

  return {
    props: {
      roadmap: getRoadmapById(roadmapId),
      group: groupId,
    },
  };
}
