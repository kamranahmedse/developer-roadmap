import { Badge, Box, Flex, Heading, Link, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type RoadmapGridItemProps = {
  title: string;
  subtitle: string;
  href: string;
  isCommunity?: boolean;
  isUpcoming?: boolean;
  colorIndex?: number;
};

const bgColorList = [
  'gray.900',
  'purple.900',
  'blue.900',
  'red.900',
  'green.900',
  'teal.900',
  'yellow.900',
  'cyan.900',
  'pink.900',

  'gray.800',
  'purple.800',
  'blue.800',
  'red.800',
  'green.800',
  'teal.800',
  'yellow.800',
  'cyan.800',
  'pink.800',

  'gray.700',
  'purple.700',
  'blue.700',
  'red.700',
  'green.700',
  'teal.700',
  'yellow.700',
  'cyan.700',
  'pink.700',

  'gray.600',
  'purple.600',
  'blue.600',
  'red.600',
  'green.600',
  'teal.600',
  'yellow.600',
  'cyan.600',
  'pink.600'
];

export function RoadmapGridItem(props: RoadmapGridItemProps) {
  const { title, subtitle, isCommunity = false, isUpcoming = false, colorIndex = 0, href = '/' } = props;

  return (
    <Box _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} as={Link} href={href} shadow='xl' p='20px'
          rounded='10px' bg={bgColorList[colorIndex] ?? bgColorList[0]} flex={1} pos='relative'>

      {isCommunity && (
        <Tooltip label={'Community contribution'} hasArrow placement='top'>
          <InfoIcon opacity={0.5} color='gray.100' position='absolute' top='10px' right='10px' />
        </Tooltip>
      )}

      <Heading color='white' mb={'6px'} fontSize='20px'>{title}</Heading>
      <Text color='gray.300' fontSize='14px'>{subtitle}</Text>

      {isUpcoming && (
        <Flex
          alignItems='center'
          justifyContent='center'
          pos='absolute'
          left={0}
          right={0}
          top={0}
          bottom={0}
          rounded='10px'
        >
          <Text color='white' bg='yellow.900' zIndex={1} fontWeight={600} p={'5px 10px'}
                rounded='10px'>Upcoming</Text>
          <Box bg={'black'} pos='absolute' top={0} left={0} right={0} bottom={0} rounded={'10px'} opacity={0.5} />
        </Flex>
      )}
    </Box>
  );
}
