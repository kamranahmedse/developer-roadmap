import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { GuideHeader } from '../../components/guide-header';
import MdRenderer from '../../components/md-renderer';

export default function Video() {
  const VideoContent = require(`../../content/videos/system-design-101.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <GuideHeader
          title={'Build it and they will come?'}
          subtitle={'Why “build it and they will come” alone won’t work anymore'}
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
