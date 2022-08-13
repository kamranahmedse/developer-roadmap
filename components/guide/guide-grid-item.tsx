import { Badge, Box, Heading, Link, Text } from '@chakra-ui/react';

type GuideGridItemProps = {
  title: string;
  href: string;
  subtitle: string;
  date: string;
  isNew?: boolean;
  colorIndex?: number;
};

const bgColorList = [
  'gray.700',
  'purple.800'
];

export function GuideGridItem(props: GuideGridItemProps) {
  const { title, subtitle, date, isNew = false, colorIndex = 0, href } = props;

  return (
    <Box _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} as={Link} href={href} shadow='xl' p='20px'
         rounded='10px' bg={bgColorList[colorIndex] ?? bgColorList[0]} flex={1}>
      <Text mb='10px' fontSize='13px' color='gray.400'>
        {isNew && <Badge colorScheme={'green'} mr='10px'>New</Badge>}
        {date}
      </Text>
      <Heading color='white' mb={'6px'} fontSize='20px'>{title}</Heading>
      <Text color='gray.300' fontSize='14px'>{subtitle}</Text>
    </Box>
  );
}
