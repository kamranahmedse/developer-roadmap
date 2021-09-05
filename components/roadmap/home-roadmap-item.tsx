import { Box, Heading, Link, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type RoadmapGridItemProps = {
  title: string;
  subtitle: string;
  isCommunity?: boolean;
  colorIndex?: number;
  url: string;
};

const bgColorList = [
  'blue.900',
  'red.800',
  'green.800',
  'teal.800',
  'gray.800',
  'red.900'
];

export function HomeRoadmapItem(props: RoadmapGridItemProps) {
  const { title, subtitle, isCommunity, colorIndex = 0, url } = props;

  return (
    <Box
      as={Link}
      href={url}
      _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }}
      flex={1}
      shadow='2xl'
      bg={bgColorList[colorIndex] ?? bgColorList[0]}
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
    </Box>
  );
}
