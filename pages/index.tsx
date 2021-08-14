import {
  Badge,
  Box, Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { VideoIcon } from '../icons/video-icon';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { UpdatesBanner } from '../components/updates-banner';
import { OpensourceBanner } from '../components/opensource-banner';

export default function Home() {
  return (
    <Box bg='teal.50' minH='100vh'>
      <Header />
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
          <SimpleGrid columns={{ xl: 3, md: 3, sm: 2, base: 1 }} spacing='20px'>
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
            </Link>
          </SimpleGrid>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md' position='relative'>
          <Box pt='60px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Visual Guides</Heading>
          </Box>

          <Stack>
            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  pos='relative'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Session based Authentication
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>June 12, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                JSON Web Tokens
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>June 05, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Token Based Authentication
                <Badge variant='subtle' colorScheme='purple' ml='5px'>Pro</Badge>
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>May 15, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Encodings</Text>
              <Text fontSize='13px' color='gray.500' as='span'>March 06, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                SSL vs TLS vs HTTPs vs SSH
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 15, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Integration and
                Deployment</Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 15, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Authentication</Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 15, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Character Encodings
                <Badge variant='subtle' colorScheme='purple' ml='5px'>Pro</Badge>
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 01, 2021</Text>
            </Link>

            <Link d='flex' justifyContent='space-between' href='#' fontSize='15px'
                  _hover={{
                    textDecoration: 'none',
                    color: 'blue.400',
                    '& .guide-title': {
                      transform: 'translateX(10px)'
                    }
                  }} borderBottomWidth={1}
                  py='5px' color='gray.600'>
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                DHCP in One Picture
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 01, 2021</Text>
            </Link>

            <Link
              d='flex'
              justifyContent='space-between'
              href='#'
              fontSize='15px'
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .guide-title': {
                  transform: 'translateX(10px)'
                }
              }}
              py='5px'
              color='gray.600'
            >
              <Text d='flex' alignItems='center' transition='200ms' className={'guide-title'} fontWeight={500}
                    as='span'>
                Session Based Authentication
              </Text>
              <Text fontSize='13px' color='gray.500' as='span'>February 01, 2021</Text>
            </Link>

            <Box position='relative' textAlign='center' bottom='20px'>
              <Box
                opacity={1}
                pointerEvents='none'
                position='absolute'
                bottom={0}
                height='200px'
                width='100%'
                background='linear-gradient(180deg, transparent, #e6fffa)'
              />

              <Link
                rounded='20px'
                display='inline'
                bg='green.600'
                color='white'
                p='7px 20px'
                href={'#'}
                fontWeight={800}
                fontSize='11px'
                textTransform='uppercase'
                my='25px'
                position='relative'
                _hover={{
                  textDecoration: 'none',
                  '& .forward-arrow': {
                    transform: 'translateX(3px)'
                  }
                }}>
                View all guides
                <Text d='inline-block' as='span' transition='200ms' ml='4px' className='forward-arrow'>&rarr;</Text>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md'>
          <Box pt='40px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Video Explanations</Heading>
          </Box>

          <VStack
            // bg={'white'}
            // borderWidth={1}
            rounded='5px'
            divider={<StackDivider borderColor='gray.200' />}
            spacing={0}
            align='stretch'
          >
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Scaling the Unscalable — System Design 101</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Tranpsort Protocols: TCP vs UDP</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>OSI Model Explained</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Creating a React App</Text>
                <Badge variant='subtle' colorScheme='purple' ml='10px'>Pro</Badge>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>DOM vs Shadow DOM vs Virtual DOM</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Everything you need to know about HTTP caching</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Content Delivery Networks</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>Load Balancers in Depth</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>DNS and How does it Work?</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>
            <Link
              fontSize='15px'
              p='10px'
              d='flex'
              fontWeight={500}
              color='gray.600'
              alignItems='center'
              justifyContent={'space-between'}
              _hover={{
                textDecoration: 'none',
                color: 'blue.400',
                '& .video-title': {
                  transform: 'translateX(10px)'
                }
              }}
            >
              <Flex alignItems='center' className='video-title' transition={'200ms'}>
                <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
                <Text as='span' ml='7px'>JavaScript Fetch API</Text>
              </Flex>
              <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>15 minutes</Text>
            </Link>

            <Box position='relative' textAlign='center' bottom='10px'>
              <Box
                opacity={1}
                pointerEvents='none'
                position='absolute'
                bottom={0}
                height='200px'
                width='100%'
                background='linear-gradient(180deg, transparent, #e6fffa)'
              />

              <Link
                rounded='20px'
                display='inline'
                bg='green.600'
                color='white'
                p='7px 20px'
                href={'#'}
                fontWeight={800}
                fontSize='11px'
                textTransform='uppercase'
                my='25px'
                position='relative'
                _hover={{
                  textDecoration: 'none',
                  '& .forward-arrow': {
                    transform: 'translateX(3px)'
                  }
                }}>
                View all Videos
                <Text d='inline-block' as='span' transition='200ms' ml='4px' className='forward-arrow'>&rarr;</Text>
              </Link>
            </Box>
          </VStack>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
