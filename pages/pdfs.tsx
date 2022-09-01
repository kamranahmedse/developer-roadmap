import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import MdRenderer from '../components/md-renderer';
import Helmet from '../components/helmet';

export default function RoadmapPDF() {
  const PDFList = require(`../content/pages/pdfs.md`).default;

  return (
    <Box bg='gray.50' minH='100vh'>
      <GlobalHeader />
      <Helmet  title={'Download Roadmaps - roadmap.sh'} />
      <Box mb='60px'>
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <PDFList />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}
