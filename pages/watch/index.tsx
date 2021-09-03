import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { VideoGridItem } from './components/video-grid-item';
import { PageHeader } from '../../components/page-header';
import { getAllVideos, VideoType } from '../../lib/video';

type VideosProps = {
  videos: VideoType[]
}

export default function Watch(props: VideosProps) {
  const { videos = [] } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <PageHeader
          title={'Watch'}
          subtitle={'Graphical video demonstrations on development topics'}
        />
        <Container maxW='container.md' position='relative'>
          <SimpleGrid columns={[1, 1, 2]} mb='30px' spacing={['10px', '10px', '15px']}>
            {videos.map((video, counter) => (
              <VideoGridItem
                href={`/watch/${video.id}`}
                key={video.id}
                title={video.title}
                subtitle={video.description}
                date={video.formattedUpdatedAt!}
                isNew={counter <= 1}
                colorIndex={counter}
                isPro={video.isPro}
              />
            ))}
          </SimpleGrid>
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
      videos: getAllVideos()
    }
  };
}
