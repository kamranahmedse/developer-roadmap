import { Box, Button, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { DownloadIcon, EmailIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { PageHeader } from '../../components/page-header';

const RoadmapBody = styled.div`
  margin-bottom: 30px;
  font-size: 15px;

  h1 {
    font-size: 32px;
    font-weight: 700;
  }

  p {
    line-height: 25px;
    margin-bottom: 20px
  }

  ul, ol {
    margin: 0 0 20px 40px;

    li + li {
      margin-top: 11px;
    }
  }
`;

export default function Roadmap() {
  return (
    <Box bg='white' minH='100vh'>
      <Header />
      <Box mb='60px'>
        <PageHeader
          title={'Frontend Developer'}
          subtitle={'Step by step guide to becoming a modern frontend developer'}
        >
          <Stack mt='20px' isInline>
            <Button size='xs' py='14px' px='10px' leftIcon={<DownloadIcon />} colorScheme='yellow' variant='solid'>
              Download PDF
            </Button>
            <Button size='xs' py='14px' px='10px' leftIcon={<EmailIcon />} colorScheme='yellow' variant='solid'>
              Subscribe
            </Button>
          </Stack>
        </PageHeader>
        <Container maxW='container.md' position='relative'>
          <RoadmapBody>
            <p>Frontend web developers work on the frontend of the websites producing HTML, CSS and JavaScript i.e. to
              produce the part of the website that users normally interact with. Alternative Job titles for a frontend
              developer include:</p>
            <ul>
              <li>Frontend Developer or Engineer</li>
              <li>Frontend Web Developer</li>
              <li>Frontend HTML/CSS Developer</li>
              <li>JavaScript Developer</li>
              <li>React Developer</li>
              <li>Vue.js Developer</li>
              <li>Angular Developer</li>
            </ul>

            <p>The diagram below shows the landscape of all the tools, technologies available for the frontend developers as well as the recommended order in which you should be learning the.</p>
          </RoadmapBody>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
