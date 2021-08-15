import { Badge, Box, Heading, Link, Text } from '@chakra-ui/react';

type RoadmapGridItemProps = {
  title: string;
  subtitle: string;
  date: string;
  isCommunity?: boolean;
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
  const { title, subtitle, date, isCommunity = false, colorIndex = 0 } = props;

  return (
    <Link _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} as={Box} href='#' shadow='xl' p='20px'
          rounded='10px' bg={bgColorList[colorIndex] ?? bgColorList[0]} flex={1}>
      <Heading color='white' mb={'6px'} fontSize='20px'>{title}</Heading>
      <Text color='gray.300' fontSize='14px'>{subtitle}</Text>
      {isCommunity && <Text mt='10px' fontSize='13px' color='gray.400'>
        <Badge colorScheme={'yellow'} mr='10px'>Community</Badge>
      </Text>}
    </Link>
  );
}
