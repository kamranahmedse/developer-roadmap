import { Badge, Box, Button, Container, Link, Stack, Text } from '@chakra-ui/react';
import { RoadmapType } from '../lib/roadmap';

type RelatedRoadmapsProps = {
  roadmaps: RoadmapType[];
};

const colorsList = [
  'gray.700',
  'purple.700',
  'blue.700',
  'red.700',
  'green.700',
  'teal.700',
  'yellow.700',
  'cyan.700',
  'pink.700'
];

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
            Related Roadmaps
          </Text>

          <Button as={Link} variant='outline' bg='white' size='sm' _hover={{ textDecoration: 'none', bg: 'gray.100' }}
                  href='/'>
            <Text as='span' display={['inline', 'none', 'none']}>More &rarr;</Text>
            <Text as='span' display={['none', 'inline', 'inline']}>All Roadmaps &rarr;</Text>
          </Button>
        </Box>

        <Stack spacing='5px'>
          {roadmaps.map((roadmap, counter) => (
            <Link
              href={`/${roadmap.id}`}
              key={roadmap.id}
              borderWidth={1}
              borderColor='blue.100'
              py='7px'
              px='14px'
              rounded='md'
              bg='white'
              textDecoration={'none'}
              _hover={{ bg: 'gray.100', borderColor: 'blue.200' }}
              bgGradient='linear(to-r, white, gray.50)'
              display='flex'
              alignItems='center'
              flexDir={['column', 'row', 'row']}
            >
              <Text
                color={colorsList[counter]}
                as='span'
                fontWeight='bold'
                display={['inline-block']}
                minWidth='140px'
              >
                {roadmap.featuredTitle}
              </Text>
              <Text as='span' display={['block', 'inline']} isTruncated maxWidth='100%' fontSize={['sm', 'sm', 'md']} color='gray.700'>{roadmap.featuredDescription}</Text>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
