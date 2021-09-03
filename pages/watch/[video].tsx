import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { ContentPageHeader } from '../../components/content-page-header';
import MdRenderer from '../../components/md-renderer';
import { getAllVideos, getVideoById, VideoType } from '../../lib/video';

type VideoProps = {
  video: VideoType;
};

export default function Video(props: VideoProps) {
  const { video } = props;
  const VideoContent = require(`../../content/videos/${video.id}.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <ContentPageHeader
          title={video.title}
          subtitle={video.description}
          formattedDate={video.formattedUpdatedAt!}
          subLink={{
            text: 'Watch on YouTube',
            url: 'https://youtube.com'
          }}
          author={{
            twitter: video.author?.twitter!,
            name: video.author?.name!,
            picture: video.author?.picture!
          }}
        />
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <VideoContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    video: string
  }
};

export async function getStaticPaths() {
  const videos = getAllVideos();
  const paramsList: StaticPathItem[] = videos.map(video => ({
    params: { 'video': video.id }
  }));

  return {
    paths: paramsList,
    fallback: false
  };
}

type ContextType = {
  params: {
    video: string
  }
};

export async function getStaticProps(context: ContextType) {
  const videoId: string = context?.params?.video;

  console.log(getVideoById(videoId));
  return {
    props: {
      video: getVideoById(videoId)
    }
  };
}

