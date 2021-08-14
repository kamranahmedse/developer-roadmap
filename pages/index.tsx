import { Box, Container, Heading, Link, SimpleGrid, StackDivider, Text, Tooltip, VStack } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { UpdatesBanner } from '../components/updates-banner';
import { OpensourceBanner } from '../components/opensource-banner';
import { GuideListItem } from './guides/components/guide-list-item';
import { DimmedMore } from '../components/dimmed-more';
import { VideoListItem } from './watch/components/video-list-item';
import { RoadmapGridItem } from './roadmaps/components/roadmap-grid-item';

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
            <RoadmapGridItem colorIndex={0} title={'Frontend'} subtitle={'Step by step guide to becoming a frontend developer in 2021'} />
            <RoadmapGridItem colorIndex={1} title={'Backend'} subtitle={'Step by step guide to becoming a backend developer in 2021'} />
            <RoadmapGridItem colorIndex={2} title={'DevOps'} subtitle={'Step by step guide for DevOps or Operations role in 2021'} />
            <RoadmapGridItem colorIndex={3} title={'React'} subtitle={'Step by step guide to become a React Developer in 2021'} />
            <RoadmapGridItem colorIndex={4} title={'DBA'} subtitle={'Step by step guide to become a PostgreSQL DBA in 2021'} isCommunity />
            <RoadmapGridItem colorIndex={5} title={'Android'} subtitle={'Step by step guide to become an Android Developer in 2021'} isCommunity />
          </SimpleGrid>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md' position='relative'>
          <Box pt='60px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Visual Guides</Heading>
          </Box>

          <VStack
            rounded='5px'
            divider={<StackDivider borderColor='gray.200' />}
            spacing={0}
            align='stretch'
          >
            <GuideListItem title='Session based Authentication' date='June 12, 2021' />
            <GuideListItem title='JSON Web Tokens' date='June 05, 2021' />
            <GuideListItem title='Token Based Authentication' date='May 15, 2021' />
            <GuideListItem isPro title='Character Encodings' date='March 06, 2021' />
            <GuideListItem title='SSL vs TLS vs HTTPs vs SSH' date='February 15, 2021' />
            <GuideListItem title='Continuous Integration and Deployment' date='February 15, 2021' />
            <GuideListItem title='Authentication' date='February 01, 2021' />
            <GuideListItem title='DHCP in One Picture' date='February 01, 2021' />
            <GuideListItem title='Session Based Authentication' date='February 01, 2021' />

            <DimmedMore text='View all Guides' />
          </VStack>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md'>
          <Box pt='40px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Video Explanations</Heading>
          </Box>

          <VStack
            rounded='5px'
            divider={<StackDivider borderColor='gray.200' />}
            spacing={0}
            align='stretch'
          >
            <VideoListItem title='Transport Protocols: TCP vs UDP' duration='15 minutes' />
            <VideoListItem title='OSI Model Explained' duration='10 minutes' />
            <VideoListItem title='Creating a React App' isPro duration='15 minutes' />
            <VideoListItem title='DOM vs Shadow DOM vs Virtual DOM' isPro duration='15 minutes' />
            <VideoListItem title='Everything you need to know about HTTP caching' isPro duration='10 minutes' />
            <VideoListItem title='Content Delivery Networks' duration='5 minutes' />
            <VideoListItem title='Load Balancers in Depth' duration='15 minutes' />
            <VideoListItem title='DNS and how does it work?' duration='2 minutes' />
            <VideoListItem title='JavaScript Fetch API' duration='22 minutes' />

            <DimmedMore text={'View all Videos'} />
          </VStack>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
