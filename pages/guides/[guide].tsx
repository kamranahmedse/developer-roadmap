import { Box, Container } from '@chakra-ui/react';
import { Header } from '../../components/header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { GuideHeader } from '../../components/guide-header';

export default function Guide() {
  return (
    <Box bg='white' minH='100vh'>
      <Header />
      <Box mb='60px'>
        <GuideHeader
          title={'Build it and they will come?'}
          subtitle={'Why “build it and they will come” alone won’t work anymore'}
        />
        <Container maxW={'container.md'} position='relative'>

        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
