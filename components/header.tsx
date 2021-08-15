import { Box, Container, Flex, Image, Link, Stack } from '@chakra-ui/react';

export function Header() {
  return (
    <Box bg='gray.900' p='20px 30px'>
      <Container maxW='container.md'>
        <Flex justifyContent='space-between'>
          <Link d='flex' href='/' alignItems='center' color='white' fontWeight={600}
                _hover={{ textDecoration: 'none' }} fontSize='18px'>
            <Image h='30px' w='30px' src='/logo.svg' mr='10px' />
            roadmap.sh
          </Link>
          <Stack shouldWrapChildren isInline spacing='15px' alignItems='center' color='gray.50' fontSize='15px'>
            <Link borderBottomWidth={0} borderBottomColor='gray.500'
                  _hover={{ textDecoration: 'none', borderBottomColor: 'white' }} fontWeight={500}
                  href='/guides'>Guides</Link>
            <Link borderBottomWidth={0} borderBottomColor='gray.500'
                  _hover={{ textDecoration: 'none', borderBottomColor: 'white' }} fontWeight={500}
                  href='/watch'>Videos</Link>
            <Link ml='10px' bgGradient='linear(to-l, yellow.700, red.600)' p='7px 10px' rounded='4px'
                  _hover={{ textDecoration: 'none', bgGradient: 'linear(to-l, red.800, yellow.700)' }}
                  fontWeight={500} href={'#'}>Get Updates</Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
