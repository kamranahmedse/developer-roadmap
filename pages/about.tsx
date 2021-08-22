import React from 'react';
import { Box, Button, Container, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { UpdatesBanner } from '../components/updates-banner';
import { Footer } from '../components/footer';
import MdRenderer from '../components/md-renderer';

function AboutHeader() {
  return (
    <Box pt='70px' pb='55px' borderBottomWidth={1} mb='30px' textAlign='left' position='static' top='10px'>
      <Container maxW='container.md' position='relative' textAlign='left'>
        <Flex alignItems='center'>
          <Image src='/kamran.jpeg' h='170px' rounded='10px' mr='25px' />
          <Box>
            <Heading as='h1' color='black' fontSize='40px' fontWeight={700} mb='10px'>Hello, I am Kamran
              Ahmed</Heading>
            <Text fontSize='17px' color='gray.700' mb='10px'>
              I created roadmap.sh to help developers find their path if they are confused and help them grow in
              their career.</Text>

            <Stack isInline>
              <Button as={Link} bg='blue.500' color='white' size='sm'
                      _hover={{ textDecoration: 'none', bg: 'blue.700' }} href='https://twitter.com/kamranahmedse'
                      arget='_blank'>
                @kamranahmedse
              </Button>

              <Button as={Link} bg='green.500' color='white' size='sm'
                      _hover={{ textDecoration: 'none', bg: 'green.700' }} href='mailto:kamranahmed.se@gmail.com'
                      target='_blank'>
                kamranahmed.se@gmail.com
              </Button>
            </Stack>

          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default function About() {
  const AboutContent = require(`../content/pages/about.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <AboutHeader />
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <AboutContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
