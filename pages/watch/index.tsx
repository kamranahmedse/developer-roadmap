import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { VideoGridItem } from '../../components/watch/video-grid-item';
import { PageHeader } from '../../components/page-header';
import { getAllVideos, VideoType } from '../../lib/video';
import Helmet from '../../components/helmet';

type VideosProps = {
  videos: VideoType[]
}

export default function Watch(props: VideosProps) {
  const { videos = [] } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet title='Watch' description='Graphical video demonstrations on development topics' />
      <Box mb='60px'>
        <PageHeader
          title={'Watch'}
          subtitle={'Graphical video demonstrations on development topics'}
        />
        <Container maxW='container.md' position='relative'>
          <SimpleGrid columns={[1, 1, 2]} mb='30px' spacing={['10px', '10px', '15px']}>
            {videos.map((video, counter) => (
              <VideoGridItem
                target='_blank'
                href={video.youtubeLink!}
                key={video.id}
                title={video.title}
                subtitle={video.description}
                date={video.formattedUpdatedAt!}
                colorIndex={counter}
                isNew={video.isNew}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <OpensourceBanner />
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
