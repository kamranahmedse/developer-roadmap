import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { GuideHeader } from '../../components/guide-header';
import MdRenderer from '../../components/md-renderer';

export default function Guide() {
  const GuideContent = require(`../../content/guides/build-it.md`).default;

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
            <GuideContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
