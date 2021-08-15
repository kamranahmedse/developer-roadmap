import { Box, Container, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { UpdatesBanner } from '../components/updates-banner';
import { OpensourceBanner } from '../components/opensource-banner';
import { DimmedMore } from '../components/dimmed-more';
import { LinksListItem } from '../components/links-list-item';
import { VideoIcon } from '../icons/video-icon';
import { LinksList } from '../components/links-list';
import { HomeRoadmapItem } from './roadmaps/components/home-roadmap-item';

export default function Home() {
  return (
    <Box bg='white' minH='100vh'>
      <Header />
      <Box>
        <Container maxW='container.md'>
          <Box py='35px'>
            <Heading fontSize='28px' mb='15px'>Hey there! 👋</Heading>
            <Text fontSize='16px' mb='10px'>
              <Text fontWeight={500} as='span'>roadmap.sh</Text> is a community effort to create roadmaps, guides and
              other educational content
              to help guide the developers in picking up the path and guide their learnings.
            </Text>

            <Text fontSize='16px'>We also have a <Link textDecoration={'underline'} href={'#'} fontWeight={600}>YouTube
              channel</Link> which we hope you are going to love.</Text>
          </Box>
          <SimpleGrid columns={{ xl: 3, md: 3, sm: 2, base: 1 }} spacing='20px'>
            <HomeRoadmapItem colorIndex={0} title={'Frontend'}
                             subtitle={'Step by step guide to becoming a frontend developer in 2021'} />
            <HomeRoadmapItem colorIndex={1} title={'Backend'}
                             subtitle={'Step by step guide to becoming a backend developer in 2021'} />
            <HomeRoadmapItem colorIndex={2} title={'DevOps'}
                             subtitle={'Step by step guide for DevOps or Operations role in 2021'} />
            <HomeRoadmapItem colorIndex={3} title={'React'}
                             subtitle={'Step by step guide to become a React Developer in 2021'} />
            <HomeRoadmapItem colorIndex={4} title={'DBA'}
                             subtitle={'Step by step guide to become a PostgreSQL DBA in 2021'} isCommunity />
            <HomeRoadmapItem colorIndex={5} title={'Android'}
                             subtitle={'Step by step guide to become an Android Developer in 2021'} isCommunity />
          </SimpleGrid>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md' position='relative'>
          <Box pt='60px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Visual Guides</Heading>
          </Box>

          <LinksList>
            <LinksListItem title='Session based Authentication' badgeText='pro' subtitle='June 12, 2021' />
            <LinksListItem title='Session based Authentication' subtitle='June 12, 2021' />
            <LinksListItem title='JSON Web Tokens' subtitle='June 05, 2021' />
            <LinksListItem title='Token Based Authentication' subtitle='May 15, 2021' />
            <LinksListItem title='Character Encodings' badgeText='pro' subtitle='March 06, 2021' />
            <LinksListItem title='SSL vs TLS vs HTTPs vs SSH' subtitle='February 15, 2021' />
            <LinksListItem title='Continuous Integration and Deployment' subtitle='February 15, 2021' />
            <LinksListItem title='Authentication' subtitle='February 01, 2021' />
            <LinksListItem title='DHCP in One Picture' subtitle='February 01, 2021' />
            <LinksListItem title='Session Based Authentication' subtitle='February 01, 2021' />

            <DimmedMore text='View all Guides' />
          </LinksList>
        </Container>
      </Box>

      <Box mb='60px'>
        <Container maxW='container.md'>
          <Box pt='40px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Video Explanations</Heading>
          </Box>

          <LinksList>
            <LinksListItem title='Transport Protocols: TCP vs UDP' subtitle='15 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='OSI Model Explained' subtitle='10 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='Creating a React App' badgeText='pro' subtitle='15 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='DOM vs Shadow DOM vs Virtual DOM' badgeText='pro' subtitle='15 minutes'
                           icon={<VideoIcon
                             style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='Everything you need to know about HTTP caching' badgeText='pro' subtitle='10 minutes'
                           icon={<VideoIcon
                             style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='Content Delivery Networks' subtitle='5 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='Load Balancers in Depth' subtitle='15 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='DNS and how does it work?' subtitle='2 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />
            <LinksListItem title='JavaScript Fetch API' subtitle='22 minutes' icon={<VideoIcon
              style={{ marginRight: '7px', width: '18px', height: '18px', color: '#9c9c9c' }} />} />

            <DimmedMore text={'View all Videos'} />
          </LinksList>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
