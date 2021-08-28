import { Box, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { VideoGridItem } from './components/video-grid-item';
import { PageHeader } from '../../components/page-header';

export default function Watch() {
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
            <VideoGridItem
              title='Session Based Authentication'
              subtitle='Learn what the Session Based Authentication is, the pros and cons.'
              date='June 25, 2021'
              isNew
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={1}
              isPro
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={2}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={3}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={4}
              isPro
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={5}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={6}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={7}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={8}
              isPro
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={9}
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={10}
              isPro
            />
            <VideoGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={11}
            />
          </SimpleGrid>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
