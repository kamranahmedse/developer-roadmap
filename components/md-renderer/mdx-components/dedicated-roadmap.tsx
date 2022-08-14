import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import TreeIcon from '../../icons/tree.svg';

type DedicatedRoadmapProps = {
  href: string;
  title: string;
  description: string;
};

export function DedicatedRoadmap(props: DedicatedRoadmapProps) {
  const { href, title, description } = props;

  return (
    <Flex as={'a'} target='_blank' href={ href } p={5} px={5} mt={6} rounded='md' alignItems='center'  _hover={{ bg: 'yellow.400'}} bg='yellow.300'>
      <Box d={['none', 'none', 'none', 'block', 'block']} mr={4} height='32px' w='32px' as={TreeIcon} color='gray.900' />
      <Box as='span'>
        <Heading fontSize='lg' as={'h4'} mb='2px' color='gray.900'>{ title }</Heading>
        <Text color='gray.700' as='span' fontSize='md'>{ description }</Text>
      </Box>
    </Flex>
  );
}
