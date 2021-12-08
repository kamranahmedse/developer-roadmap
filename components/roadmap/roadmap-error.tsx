import { RoadmapType } from '../../lib/roadmap';
import { Container, Heading, Link, Text } from '@chakra-ui/react';
import siteConfig from '../../content/site.json';

type RoadmapProps = {
  roadmap: RoadmapType;
};

export function RoadmapError(props: RoadmapProps) {
  const { roadmap } = props;

  return (
    <Container
      bg={'red.600'}
      maxW={'container.md'}
      position="relative"
      mt="50px"
      p='20px'
      rounded='5px'
      color='white'
    >
      <Heading mb='4px' size='md'>Oops! There&apos;s an error</Heading>
      <Text>Try refreshing or <Link target='_blank' fontWeight={700} textDecoration={'underline'} fontSize='14px' href={siteConfig.url.issue}>report a bug</Link> and use the <Link fontWeight={700} textDecoration={'underline'} href={`/roadmaps/${roadmap.id}.png`}>non-interactive version</Link></Text>
    </Container>
  );
}
