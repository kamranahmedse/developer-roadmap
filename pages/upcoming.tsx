import { Box, Button, Container, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import { PageHeader } from '../components/page-header';
import Helmet from '../components/helmet';
import { NewAlertBanner } from '../components/roadmap/new-alert-banner';
import { BellIcon, EmailIcon } from '@chakra-ui/icons';
import { SIGNUP_EMAIL_INPUT_NAME, SIGNUP_FORM_ACTION } from './signup';
import React from 'react';
import { upcomingRoadmaps } from '../components/home/featured-roadmaps-list';

export function getParameterByName(name: string, url: string = (typeof window !== 'undefined' ? window : {} as any)?.location?.href) {
  name = name.replace(/[\[\]]/g, '\\$&');

  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function Upcoming() {
  const roadmapId = getParameterByName('id');
  const foundRoadmap = upcomingRoadmaps.find(roadmap => roadmap.id === roadmapId) || {} as any;

  const title = foundRoadmap?.title || 'Upcoming Roadmap';
  const description = foundRoadmap.description || 'Roadmap is not yet ready. Subscribe yourself below to get notified.';

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        noIndex={true}
        title={title}
        description={description}
      />
      <Box mb='60px'>
        <PageHeader
          beforeTitle={<NewAlertBanner />}
          title={title}
          subtitle={description}
        />
        <Container maxW='container.md' position='relative'>
          <Flex flexDir='column' alignItems='center' borderWidth={1} rounded='lg' py={10} boxShadow='inner' px={5}>
            <BellIcon w='90px' h='90px' color='gray.200' mb={5} />
            <Heading mb={2} fontSize='2xl' >Upcoming Roadmap</Heading>
            <Text fontSize='sm' mb={4}>Please check back later or subscribe below.</Text>

            <form action={SIGNUP_FORM_ACTION} method='post'>
              <Input type='email' bg={'white'} size='lg' placeholder='Enter your email' mb={2} name={SIGNUP_EMAIL_INPUT_NAME} required />
              <Button size='lg' isFullWidth colorScheme='teal' leftIcon={<EmailIcon />} type='submit'>Get Notified</Button>
            </form>
          </Flex>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}
