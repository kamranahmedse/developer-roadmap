import React from 'react';
import { Box, Button, Container, Heading, Input, Link, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import { CheckCircleIcon } from '@chakra-ui/icons';
import siteConfig from '../content/site.json';
import Helmet from '../components/helmet';

export const SIGNUP_FORM_ACTION = 'https://www.getrevue.co/profile/roadmap/add_subscriber';
export const SIGNUP_EMAIL_INPUT_NAME = 'member[email]';

export function FreeSignUp() {
  return (
    <Box p='20px' rounded='5px' borderWidth={2}>
      <Box textAlign='left'>
        <Heading mb='10px' fontSize='23px' fontWeight={700}>Monthly Updates</Heading>
        <Text mb='14px' fontSize='14px' lineHeight='20px'>Enter your email below to get notified about the new
          roadmaps, guides and updates</Text>

        <form action={SIGNUP_FORM_ACTION} method='post' target='_blank'>
          <Input size='sm' fontSize='15px' py='18px' rounded='4px' placeholder='Your email'
                 borderWidth={2} mb={'10px'} name={SIGNUP_EMAIL_INPUT_NAME} />
          <Button type={'submit'} bg='gray.700' _hover={{ bg: 'black' }} fontWeight={500} color={'white'} w='100%'>Subscribe</Button>
        </form>

        <Text color='gray.500' fontSize='12px' mt='10px'>
          <Text as='span'>Once a month email</Text> about the changes to roadmaps, new roadmaps, free guides and
          videos.
        </Text>
      </Box>
    </Box>
  );
}

function PaidSignUp() {
  return (
    <Box p='20px' rounded='5px' borderWidth={2} bg='yellow.100' borderColor='yellow.200'>
      <Heading mb='10px' fontSize='23px' fontWeight={700}>Updates and Paid Content</Heading>
      <Text mb='20px' fontSize='14px' lineHeight='20px'>People sponsoring me on GitHub get access to the updates
        as well as paid content.</Text>

      <List spacing={2}>
        <ListItem fontSize='14px'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Get notified about the updates
        </ListItem>
        <ListItem fontSize='14px'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Access to paid guides and Videos
        </ListItem>
        <ListItem fontSize='14px'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Support the Project
        </ListItem>
        <ListItem fontSize='14px'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Get a shoutout on <Link fontWeight={600} textDecoration='underline'
                                  href={siteConfig.url.twitter} target='_blank'>Twitter</Link>
        </ListItem>
        <ListItem fontSize='14px'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          Your name will be added to <Link fontWeight={600} textDecoration='underline'
                                           href='/thanks'>Thanks</Link>
        </ListItem>

      </List>
      <Button target='_blank' mt='20px' color='white' bg='green.500'
              _hover={{ textDecoration: 'none', bg: 'green.700' }} w='100%'
              as={Link} href={siteConfig.url.sponsor}>Sponsor
        on GitHub</Button>
    </Box>
  );
}

export default function SignUp() {
  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet title={'Sign Up: Be a part of the community'} />
      <Box mb='60px'>
        <Container maxW={'container.md'} position='relative'>
          <Box columns={1} maxWidth='400px' mx='auto' spacing='15px' my={['30px', '30px', '80px']}>
            <FreeSignUp />
          </Box>
        </Container>
      </Box>

      <OpensourceBanner />
      <Footer />
    </Box>
  );
}
