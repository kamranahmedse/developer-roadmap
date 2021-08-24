import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Button,
  ListItem,
  List,
  ListIcon,
  Link
} from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { UpdatesBanner } from '../components/updates-banner';
import { Footer } from '../components/footer';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function SignUp() {
  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <Container maxW={'container.md'} position='relative'>
          <SimpleGrid columns={2} spacing='15px' my='80px'>
            <Box p='20px' rounded='5px' borderWidth={2}>
              <Box textAlign='left'>
                <Heading mb='10px' fontSize='23px' fontWeight={700}>Monthly Updates</Heading>
                <Text mb='14px' fontSize='14px' lineHeight='20px'>Enter your email below to get notified about the new
                  roadmaps, guides and updates</Text>
                <Input size='sm' fontSize='15px' py='18px' rounded='4px' placeholder='Your email'
                       borderWidth={2} mb={'10px'} />
                <Button bg='gray.700' _hover={{ bg: 'black' }} fontWeight={500} color={'white'}
                        w='100%'>Subscribe</Button>

                <Text color='gray.500' fontSize='12px' mt='10px'>
                  <Text as='span'>Once a month email</Text> about the changes to roadmaps, new roadmaps, free guides and
                  videos.
                </Text>
              </Box>
            </Box>
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
                                          href='https://twitter.com/kamranahmedse' target='_blank'>Twitter</Link>
                </ListItem>
                <ListItem fontSize='14px'>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Your name will be added to <Link fontWeight={600} textDecoration='underline'
                                                   href='https://twitter.com/kamranahmedse'
                                                   target='_blank'>Thanks</Link>
                </ListItem>

              </List>
              <Link mt='20px' color='white' bg='green.500' _hover={{ textDecoration: 'none', bg: 'green.700' }} w='100%'
                    as={Button} href={'#'}>Sponsor
                on GitHub</Link>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
