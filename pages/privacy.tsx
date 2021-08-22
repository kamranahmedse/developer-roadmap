import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { UpdatesBanner } from '../components/updates-banner';
import { Footer } from '../components/footer';
import MdRenderer from '../components/md-renderer';

export default function Privacy() {
  const PrivacyContent = require(`../content/pages/privacy.md`).default;

  return (
    <Box bg='gray.50' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <PrivacyContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
