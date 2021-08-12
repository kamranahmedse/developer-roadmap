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
import { VideoIcon } from './icons/video-icon';

export default function Home() {
  return (
    <Box bg='teal.50' minH='100vh'>
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
              {/*<Badge mt='10px' variant="subtle" colorScheme="green">*/}
              {/*  Community*/}
              {/*</Badge>*/}
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

      <Box borderTopWidth={1} mt='60px' pt='70px' pb='80px' textAlign='center'>
        <Container maxW='container.md'>
          <Heading fontSize='35px' mb='20px'>Open Source</Heading>
          <Text lineHeight='26px' fontSize='16px' mb='20px'>The project is OpenSource,&nbsp;
            <Link
              _hover={{ textDecoration: 'none' }}
              href='https://github.com/search?o=desc&q=stars%3A%3E100000&s=stars&type=Repositories'
              target='_blank'
              borderBottomWidth={1}
              fontWeight={600}
            >7th most starred project on GitHub</Link> and is visited by hundreds of thousands of
            developers every month.</Text>
          <iframe
            src='https://ghbtns.com/github-btn.html?user=kamranahmedse&repo=developer-roadmap&type=star&count=true&size=large'
            frameBorder='0'
            scrolling='0'
            width='170'
            height='30'
            style={{ margin: 'auto', marginBottom: '30px' }}
            title='GitHub'
          />

          <Text lineHeight='26px' fontSize='16px' mb='15px'>A considerable amount of my time is spent doing unpaid
            community work on things that I hope will help humanity in some way. Your sponsorship helps me continue to
            produce more open-source and free educational material consumed by hundreds of thousands of developers every month.</Text>

          <Box>
            <iframe
              src='https://ghbtns.com/github-btn.html?user=kamranahmedse&type=sponsor&size=large'
              frameBorder='0'
              scrolling='0'
              width='260'
              height='30'
              title='GitHub'
              style={{ margin: 'auto' }}
            />
          </Box>
        </Container>
      </Box>

      <Box bg='gray.900' p='40px 30px'>
        <Container maxW='container.md'>
          <Stack isInline color='white' fontWeight={600} spacing='30px'>
            <Link href='#'>Home</Link>
            <Link href='#'>Roadmaps</Link>
            <Link href='#'>Guides</Link>
            <Link href='#'>Videos</Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
