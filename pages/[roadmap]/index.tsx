import { Box, Button, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { DownloadIcon, EmailIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import Image from 'next/image';
import { GlobalHeader } from '../../components/global-header';
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
      margin-top: 7px;
    }
  }

  img {
    max-width: 100%;
  }
`;

export default function Roadmap() {
  const isImageOnly = true;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
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
        <Container maxW={ isImageOnly ? '900px': 'container.md'} position='relative'>
          <RoadmapBody>
            <img alt='Frontend Roadmap' src='/roadmaps/frontend.png' />
          </RoadmapBody>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
