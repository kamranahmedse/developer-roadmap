import { Box, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function Home() {
  return (
    <Box bg='teal.50' minH='100vh' pb='100px'>
      <Box bg='gray.900' p='20px 30px'>
        <Container maxW='container.md'>
          <Flex justifyContent='space-between'>
            <Link d='flex' href='/' alignItems='center' color='white' fontWeight={600}
                  _hover={{ textDecoration: 'none' }} fontSize='18px'>
              <Image h='30px' w='30px' src='/logo.svg' mr='10px' />
              roadmap.sh
            </Link>
            {/*<Link d='flex' href='/' color='white' fontWeight={600} fontSize='20px'>*/}
            {/*  roadmap.sh*/}
            {/*</Link>*/}
            <Stack shouldWrapChildren isInline spacing='15px' alignItems='center' color='gray.50' fontSize='15px'>
              <Link borderBottomWidth={0} borderBottomColor='gray.500'
                    _hover={{ textDecoration: 'none', borderBottomColor: 'white' }} fontWeight={500}
                    href='#'>Read</Link>
              <Link borderBottomWidth={0} borderBottomColor='gray.500'
                    _hover={{ textDecoration: 'none', borderBottomColor: 'white' }} fontWeight={500}
                    href='#'>Watch</Link>
              <Link ml='10px' bgGradient='linear(to-l, yellow.700, red.600)' p='7px 10px' rounded='4px'
                    _hover={{ textDecoration: 'none', bgGradient: 'linear(to-l, red.800, yellow.700)' }}
                    fontWeight={500} href={'#'}>Become a Member</Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Box>
        <Container maxW='container.md'>
          <Box py='30px'>
            <Heading fontSize='28px' mb='15px'>Hey there! 👋</Heading>
            <Text fontSize='16px' mb='10px'>
              <Text fontWeight={500} as='span'>roadmap.sh</Text> is a community effort to create roadmaps, guides and
              other educational content
              to help guide the developers in picking up the path and guide their learnings.
            </Text>

            <Text fontSize='16px'>We also have a <Link textDecoration={'underline'} href={'#'} fontWeight={600}>YouTube
              channel</Link> and <Link textDecoration='underline' href={'#'} fontWeight={600}>graphical
              guides</Link> which we hope you are going to love.</Text>
          </Box>
          <SimpleGrid columns={{ xl: 3, md: 3, sm: 2, base: 1 }} isInline spacing='20px'>
            <Link as={Box} href={'#'} _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1}
                  shadow='2xl'
                  bg='blue.900' color='white' p='15px' rounded='10px'>
              <Heading fontSize='22px' mb='5px'>Frontend</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide to becoming a frontend developer in 2021</Text>
            </Link>

            <Link as={Box} href='#' _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1} shadow='2xl'
                  bg='red.800' color='white' p='15px' rounded='10px'>
              <Heading fontSize='22px' mb='5px'>Backend</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide to becoming a backend developer in 2021</Text>
            </Link>

            <Link as={Box} href='#' _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1} shadow='2xl'
                  bg='green.800' color='white' p='15px' rounded='10px'>
              <Heading fontSize='22px' mb='5px'>DevOps</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide for DevOps or Operations role in 2021</Text>
            </Link>

            <Link as={Box} href='#' _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1} shadow='2xl'
                  bg='teal.800' color='white' p='15px' rounded='10px'>
              <Heading fontSize='22px' mb='5px'>React</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide for DevOps or Operations role in 2021</Text>
            </Link>

            <Link as={Box} href='#' _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1} shadow='2xl'
                  bg='gray.800' color='white' p='15px' rounded='10px'>
              <Heading fontSize='22px' mb='5px'>DBA</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide for DevOps or Operations role in 2021</Text>
            </Link>

            <Link as={Box} href={'#'} _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} flex={1}
                  shadow='2xl'
                  bg='red.900' color='white' p='15px' rounded='10px' position='relative'>
              <Tooltip label={'Community contribution'} hasArrow placement='top'>
                <InfoIcon opacity={0.5} position='absolute' top='10px' right='10px' />
              </Tooltip>
              <Heading fontSize='22px' mb='5px'>Android</Heading>
              <Text color='gray.200' fontSize='13px'>Step by step guide for DevOps or Operations role in 2021</Text>
              {/*<Badge mt='10px' variant="subtle" colorScheme="green">*/}
              {/*  Community*/}
              {/*</Badge>*/}
            </Link>
          </SimpleGrid>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md'>
          <Box pt='40px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Visual Guides</Heading>
            {/*<Text>Programming topics explained succinctly through visuals.</Text>*/}
          </Box>

          <Stack>
            <Link d='flex' justifyContent='space-between' href='#' fontSize='17px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text transition='200ms' className={'guide-title'} fontWeight={500} as='span'>Session based
                Authentication</Text>
              <Text fontSize='14px' color='gray.500' as='span'>June 12, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='17px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text transition='200ms' className={'guide-title'} fontWeight={500} as='span'>JSON Web Tokens</Text>
              <Text fontSize='14px' color='gray.500' as='span'>June 05, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='17px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text transition='200ms' className={'guide-title'} fontWeight={500} as='span'>Token Based Authentication</Text>
              <Text fontSize='14px' color='gray.500' as='span'>May 15, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='17px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text transition='200ms' className={'guide-title'} fontWeight={500} as='span'>Character Encodings</Text>
              <Text fontSize='14px' color='gray.500' as='span'>March 06, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='17px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text transition='200ms' className={'guide-title'} fontWeight={500} as='span'>SSL vs TLS vs HTTPs vs SSH</Text>
              <Text fontSize='14px' color='gray.500' as='span'>February 15, 2021</Text>
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
