import { Box, Container, Flex, Image, Link, Stack, Text, List, ListItem } from '@chakra-ui/react';
import siteConfig from '../content/site.json';
import { CustomAd } from './custom-ad';
import React from 'react';

function NavigationLinks() {
  return (
    <>
      <Stack isInline d={['none', 'none', 'flex']} color='gray.400' fontWeight={600} spacing='30px' as='nav'>
        <List display='flex' gap={8}>
          <ListItem>
            <Link _hover={{ color: 'white' }} href='/roadmaps'>Roadmaps</Link>
          </ListItem>
          <ListItem>
            <Link _hover={{ color: 'white' }} href='/guides'>Guides</Link>
          </ListItem>
          <ListItem>
            <Link _hover={{ color: 'white' }} href='/watch'>Videos</Link>
          </ListItem>
          <ListItem>
            <Link _hover={{ color: 'white' }} href='/about'>About</Link>
          </ListItem>
          <ListItem>
            <Link _hover={{ color: 'white' }} href={siteConfig.url.youtube} target='_blank'>YouTube</Link>
          </ListItem>
        </List>
      </Stack>

      <Stack d={['flex', 'flex', 'none']} color='gray.400' fontWeight={600} spacing={0} as='nav'>
        <List display='flex' flexDirection='column' gap={0}>
          <ListItem display='flex'>
            <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
                  href='/roadmaps' width='100%'>Roadmaps</Link>
          </ListItem>
          <ListItem display='flex'>
            <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
                  href='/guides' width='100%'>Guides</Link>
          </ListItem>
          <ListItem display='flex'>
            <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
                  href='/watch' width='100%'>Videos</Link>
          </ListItem>
          <ListItem display='flex'>
            <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
                  href='/about' width='100%'>About</Link>
          </ListItem>
          <ListItem display='flex'>
            <Link py='7px' _hover={{ color: 'white' }} target='_blank'
                  href={siteConfig.url.youtube} width='100%'>YouTube</Link>
          </ListItem>
        </List>
      </Stack>
    </>
  );
}

export function Footer() {
  return (
    <Box bg='brand.hero' p={['25px 0', '25px 0', '40px 0']} as='footer'>
      <Container maxW='container.md'>
        <NavigationLinks />

        <Box mt={['40px', '40px', '50px']} mb='40px' maxW='500px'>
          <Flex spacing={0} alignItems='center' color='gray.400'>
            <Link d='flex' alignItems='center' fontWeight={600} _hover={{ textDecoration: 'none', color: 'white' }}
                  href='/'>
              <Image alt='' h='25px' w='25px' src='/logo.svg' mr='6px' />
              roadmap.sh
            </Link>
            <Text as='span' mx='7px'>by</Text>
            <Link bg='blue.500' px='6px' py='2px' rounded='4px' color='white' fontWeight={600} fontSize='13px'
                  _hover={{ textDecoration: 'none', bg: 'blue.600' }} href={siteConfig.url.twitter}
                  target='_blank'>@kamranahmedse</Link>
          </Flex>

          <Text my='15px' fontSize='14px' color='gray.500'>Community created roadmaps, articles, resources and
            journeys to help you choose your path and grow in your career.</Text>

          <Text fontSize='14px' color='gray.500'>
            <Text as='span' mr='10px'>&copy; roadmap.sh</Text>&middot;
            <Link href='/about' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>FAQs</Link>&middot;
            <Link href='/terms' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>Terms</Link>&middot;
            <Link href='/privacy' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>Privacy</Link>
          </Text>
        </Box>
      </Container>

      <CustomAd />
    </Box>
  );
}
