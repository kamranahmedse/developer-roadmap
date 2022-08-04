import { Box, Container, Link, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import { ContentPageHeader } from '../../components/content-page-header';
import MdRenderer from '../../components/md-renderer';
import { getAllVideos, getVideoById, VideoType } from '../../lib/video';
import Helmet from '../../components/helmet';

type VideoProps = {
  video: VideoType;
};

export default function Video(props: VideoProps) {
  const { video } = props;
  const VideoContent = require(`../../content/videos/${video.id}.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet title={video.title} description={video.description} />
      <Box mb='60px'>
        <ContentPageHeader
          title={video.title}
          subtitle={video.description}
          formattedDate={video.formattedUpdatedAt!}
          subLink={video.youtubeLink ? {
            text: 'Watch on YouTube',
            url: video.youtubeLink
          } : undefined}
          author={{
            twitter: video.author?.twitter!,
            name: video.author?.name!,
            picture: video.author?.picture!
          }}
        />
        <Container maxW={'container.md'} position='relative'>
          {video.youtubeLink && (
            <Text mb='18px'>We are working on a better watch page — for now this <Link fontWeight={600}
                                                                                       textDecoration={'underline'}
                                                                                       href={video.youtubeLink}
                                                                                       target='_blank'>video is best
              viewed on YouTube</Link>.</Text>)}
          <MdRenderer>
            <VideoContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
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

  return {
    props: {
      video: getVideoById(videoId)
    }
  };
}

