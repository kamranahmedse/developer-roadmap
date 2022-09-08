import { Badge, Box, Button, Container, Link, Stack, Text } from '@chakra-ui/react';
import { RoadmapType } from '../lib/roadmap';

type RelatedRoadmapsProps = {
  roadmaps: RoadmapType[];
};

export function RelatedRoadmaps(props: RelatedRoadmapsProps) {
  const { roadmaps } = props;
  if (!roadmaps.length) {
    return null;
  }

  return (
    <Box borderTopWidth={1} bgColor='gray.50' pb='35px' pt='5px'>
      <Container maxW='container.md'>
        <Box display='flex' position='relative' top='-23px' alignItems='center' justifyContent='space-between'>
          <Text textAlign='center' borderWidth={1} bg='white' p='4px' fontWeight='bold' rounded='md' px={'15px'}>
            <Text as='span' display={['none', 'none', 'inline']}>Other</Text> Related Roadmaps
          </Text>

          <Button as={Link} variant='outline' bg='white' size='sm' _hover={{ textDecoration: 'none', bg: 'gray.100' }} href='/'>
            <Text as='span' display={['inline', 'none', 'none']}>More &rarr;</Text>
            <Text as='span' display={['none', 'inline', 'inline']}>All Roadmaps &rarr;</Text>
          </Button>
        </Box>

        <Stack spacing='5px'>
          { roadmaps.map(roadmap => (
            <Link href={`/${roadmap.id}`} key={roadmap.id} borderWidth={1} display='block' py='5px' px='10px' rounded='md' bg='white'
                  textDecoration={'none'} _hover={{ bg: 'gray.50' }}>
              <Badge display={['none', 'inline']} position='relative' top='-1px' colorScheme='blue' mr='7px'>{ roadmap.featuredTitle }</Badge>
              <Text as='span' display={['block', 'inline']} fontSize={['sm', 'sm', 'md']}>{ roadmap.featuredDescription }</Text>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
