import { Box, Container, Flex, Image, Link, Stack, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box bg='gray.900' p='40px 30px'>
      <Container maxW='container.md'>
        <Stack isInline color='gray.400' fontWeight={600} spacing='30px'>
          <Link _hover={{ color: 'white' }} href='#'>Roadmaps</Link>
          <Link _hover={{ color: 'white' }} href='#'>Guides</Link>
          <Link _hover={{ color: 'white' }} href='#'>Videos</Link>
          <Link _hover={{ color: 'white' }} href='#'>Podcasts</Link>
          <Link _hover={{ color: 'white' }} href='#'>About</Link>
          <Link _hover={{ color: 'white' }} href='#'>YouTube</Link>
        </Stack>

        <Box my='50px' maxW='500px'>
          <Flex spacing={0} alignItems='center' color='gray.400'>
            <Link d='flex' alignItems='center' fontWeight={600} _hover={{ textDecoration: 'none', color: 'white' }}
                  href='/'>
              <Image h='25px' w='25px' src='/logo.svg' mr='6px' />
              roadmap.sh
            </Link>
            <Text as='span' mx='7px'>by</Text>
            <Link bg='blue.500' px='6px' py='2px' rounded='4px' color='white' fontWeight={600} fontSize='13px'
                  _hover={{ textDecoration: 'none', bg: 'blue.600' }} href='/'>@kamranahmedse</Link>
          </Flex>

          <Text my='15px' fontSize='14px' color='gray.500'>Community created roadmaps, articles, resources and
            journeys to help you choose your path and grow in your career.</Text>

          <Text fontSize='14px' color='gray.500'>
            <Text as='span' mr='10px'>&copy; roadmap.sh</Text>&middot;
            <Link _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400' mx='10px'>FAQs</Link>&middot;
            <Link _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400' mx='10px'>Terms</Link>&middot;
            <Link _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400' mx='10px'>Privacy</Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
