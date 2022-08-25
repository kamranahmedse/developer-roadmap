import { Box, Container, Heading, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { Footer } from '../components/footer';
import { OpensourceBanner } from '../components/opensource-banner';
import { DimmedMore } from '../components/dimmed-more';
import { LinksListItem } from '../components/links-list-item';
import { VideoIcon } from '../components/icons/video-icon';
import { LinksList } from '../components/links-list';
import { HomeRoadmapItem } from '../components/roadmap/home-roadmap-item';
import { getFeaturedRoadmaps, RoadmapType } from '../lib/roadmap';
import { getAllGuides, GuideType } from '../lib/guide';
import { getAllVideos, VideoType } from '../lib/video';
import Helmet from '../components/helmet';
import { PageWrapper } from '../components/page-wrapper';
import { FeaturedRoadmapsList } from '../components/home/featured-roadmaps-list';

type HomeProps = {
  roadmaps: RoadmapType[];
  guides: GuideType[];
  videos: VideoType[];
};

export default function Home(props: HomeProps) {
  const { roadmaps, guides, videos } = props;

  return (
    <PageWrapper>
      <GlobalHeader variant={'transparent'} />
      <Helmet title="Developer Roadmaps" />
      <Box>
        <Container maxW="container.md" pb="90px">
          <Box py={['23px', '23px', '35px']} color="gray.200">
            <Heading
              color="gray.50"
              fontSize={['22px', '22px', '28px']}
              mb={['8px', '8px', '15px']}
            >
              Hey there! 👋
            </Heading>
            <Text fontSize={['14px', '14px', '16px']} mb="10px">
              <Text fontWeight={500} as="span">
                roadmap.sh
              </Text>{' '}
              is a community effort to create roadmaps, guides and other
              educational content to help guide the developers in picking up the
              path and guide their learnings.
            </Text>
          </Box>

          <FeaturedRoadmapsList
            roadmaps={roadmaps.filter(roadmap => roadmap.type === 'role')}
            title={'Role Based' }
          />

          <FeaturedRoadmapsList
            roadmaps={roadmaps.filter(roadmap => roadmap.type === 'tool')}
            title={'Tool Based' }
          />
        </Container>
      </Box>

      <Box bg="white">
        <Container maxW="container.md">
          <Box pt="60px" mb={['10px', '15px', '20px']}>
            <Heading
              color="green.500"
              fontSize={['20px', '20px', '25px']}
              mb="5px"
            >
              Video Explanations
            </Heading>
          </Box>

          <LinksList>
            {videos.map((video) => (
              <LinksListItem
                target={'_blank'}
                key={video.id}
                href={video.youtubeLink!}
                badgeText={video.isNew ? 'NEW' : ''}
                hideSubtitleOnMobile
                title={video.title}
                subtitle={video.duration}
                icon={
                  <VideoIcon
                    style={{
                      marginRight: '7px',
                      width: '18px',
                      height: '18px',
                      color: '#9c9c9c',
                    }}
                  />
                }
              />
            ))}
            <DimmedMore href="/watch" text={'View all Videos'} />
          </LinksList>
        </Container>
      </Box>

      <Box pb="80px" bg="white">
        <Container maxW="container.md" position="relative">
          <Box pt="40px" mb="20px">
            <Heading color="green.500" fontSize="25px" mb="5px">
              Visual Guides
            </Heading>
          </Box>

          <LinksList>
            {guides.map((guide) => (
              <LinksListItem
                key={guide.id}
                href={`/guides/${guide.id}`}
                title={guide.title}
                badgeText={guide.isNew ? 'NEW' : ''}
                subtitle={guide.formattedUpdatedAt!}
              />
            ))}
            <DimmedMore href={'/guides'} text="View all Guides" />
          </LinksList>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roadmaps: getFeaturedRoadmaps(),
      guides: getAllGuides(10),
      videos: getAllVideos(10),
    },
  };
}
