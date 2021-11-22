import { Box, Flex, Heading, Link, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type RoadmapGridItemProps = {
  title: string;
  subtitle: string;
  isCommunity?: boolean;
  isUpcoming?: boolean;
  colorIndex?: number;
  url: string;
};

const bgColorList = [
  'blue.900',
  'red.800',
  'green.800',
  'teal.800',
  'blue.800',
  'red.900',
  'gray.900',
  'teal.800',
  'yellow.900',
  'green.900',
  'red.900'
];

export function HomeRoadmapItem(props: RoadmapGridItemProps) {
  const { title, subtitle, isCommunity, colorIndex = 0, url, isUpcoming } = props;

  return (
    <Box
      as={Link}
      href={url}
      _hover={{ textDecoration: 'none', transform: 'scale(1.02)', opacity: '1 !important' }}
      flex={1}
      shadow='2xl'
      className={'home-roadmap-item'}
      bg={'rgba(255,255,255,.05)'}
      color='white'
      p='15px'
      rounded='10px'
      pos='relative'
    >
      {isCommunity && (
        <Tooltip label={'Community contribution'} hasArrow placement='top'>
          <InfoIcon opacity={0.5} position='absolute' top='10px' right='10px' />
        </Tooltip>
      )}

      <Heading fontSize={['17px', '17px', '22px']} mb='5px'>{title}</Heading>
      <Text color='gray.200' fontSize={['13px']}>{subtitle}</Text>

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
          <Text color='white' bg='gray.600' zIndex={1} fontWeight={600} p={'5px 10px'}
                rounded='10px'>Upcoming</Text>
          <Box bg={'black'} pos='absolute' top={0} left={0} right={0} bottom={0} rounded={'10px'} opacity={0.5} />
        </Flex>
      )}
    </Box>
  );
}
