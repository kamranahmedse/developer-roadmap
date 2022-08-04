import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import MdRenderer from '../components/md-renderer';
import Helmet from '../components/helmet';

export default function Terms() {
  const TermsContent = require(`../content/pages/terms.md`).default;

  return (
    <Box bg='gray.50' minH='100vh'>
      <GlobalHeader />
      <Helmet title={'Terms – roadmap.sh'} />
      <Box mb='60px'>
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <TermsContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}
