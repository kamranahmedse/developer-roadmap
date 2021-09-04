import { Box, Container, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { Footer } from '../components/footer';
import { UpdatesBanner } from '../components/updates-banner';
import { OpensourceBanner } from '../components/opensource-banner';
import { DimmedMore } from '../components/dimmed-more';
import { LinksListItem } from '../components/links-list-item';
import { VideoIcon } from '../icons/video-icon';
import { LinksList } from '../components/links-list';
import { HomeRoadmapItem } from './roadmaps/components/home-roadmap-item';
import { getFeaturedRoadmaps, RoadmapType } from '../lib/roadmap';
import { getAllGuides, GuideType } from '../lib/guide';
import { getAllVideos, VideoType } from '../lib/video';
import siteConfig from '../content/site.json';

type HomeProps = {
  roadmaps: RoadmapType[];
  guides: GuideType[];
  videos: VideoType[];
}

export default function Home(props: HomeProps) {
  const { roadmaps, guides, videos } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box>
        <Container maxW='container.md'>
          <Box py={['23px', '23px', '35px']}>
            <Heading fontSize={['22px', '22px', '28px']} mb={['8px', '8px', '15px']}>Hey there! 👋</Heading>
            <Text fontSize={['14px', '14px', '16px']} mb='10px'>
              <Text fontWeight={500} as='span'>roadmap.sh</Text> is a community effort to create roadmaps, guides and
              other educational content
              to help guide the developers in picking up the path and guide their learnings.
            </Text>

            <Text fontSize={['14px', '14px', '16px']}>We also have a <Link textDecoration={'underline'}
                                                                           href={siteConfig.url.youtube}
                                                                           target='_blank'
                                                                           fontWeight={600}>YouTube
              channel</Link> which we hope you are going to love.</Text>
          </Box>
          <SimpleGrid columns={[1, 2, 3]} spacing={['10px', '10px', '15px']}>
            {roadmaps.map((roadmap: RoadmapType, counter: number) => (
              <HomeRoadmapItem
                url={`/${roadmap.id}`}
                key={roadmap.id}
                colorIndex={counter}
                title={roadmap.featuredTitle}
                isCommunity={roadmap.isCommunity}
                subtitle={roadmap.featuredDescription}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box>
        <Container maxW='container.md' position='relative'>
          <Box pt='60px' mb={['10px', '15px', '20px']}>
            <Heading color='green.500' fontSize={['20px', '20px', '25px']} mb='5px'>Visual Guides</Heading>
          </Box>

          <LinksList>
            {guides.map(guide => (
              <LinksListItem
                key={guide.id}
                href={`/guides/${guide.id}`}
                title={guide.title}
                badgeText={guide.isPro ? 'PRO' : ''}
                subtitle={guide.formattedUpdatedAt!}
              />
            ))}
            <DimmedMore href={'/guides'} text='View all Guides' />
          </LinksList>
        </Container>
      </Box>

      <Box mb='60px'>
        <Container maxW='container.md'>
          <Box pt='40px' mb='20px'>
            <Heading color='green.500' fontSize='25px' mb='5px'>Video Explanations</Heading>
          </Box>

          <LinksList>
            {videos.map(video => (
              <LinksListItem
                key={video.id}
                href={`/watch/${video.id}`}
                badgeText={video.isPro ? 'PRO' : ''}
                hideSubtitleOnMobile
                title={video.title}
                subtitle={video.duration}
                icon={
                  <VideoIcon
                    style={{
                      marginRight: '7px',
                      width: '18px',
                      height: '18px',
                      color: '#9c9c9c'
                    }}
                  />
                }
              />
            ))}
            <DimmedMore href='/watch' text={'View all Videos'} />
          </LinksList>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roadmaps: getFeaturedRoadmaps(),
      guides: getAllGuides(10),
      videos: getAllVideos(10)
    }
  };
}
