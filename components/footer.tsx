import { Box, Container, Flex, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import siteConfig from '../content/site.json';
import { CustomAd } from './custom-ad';
import React from 'react';
import { event } from '../lib/gtag';

function NavigationLinks() {
  return (
    <>
      <Stack isInline display={['none', 'none', 'flex']} justifyContent='center' color='gray.400' fontWeight={600}
             spacing='30px'>
        <Link _hover={{ color: 'white' }} href='/roadmaps'>Roadmaps</Link>
        <Link _hover={{ color: 'white' }} href='/guides'>Guides</Link>
        <Link _hover={{ color: 'white' }} href='/watch'>Videos</Link>
        <Link _hover={{ color: 'white' }} href='/about'>About</Link>
        <Link _hover={{ color: 'white' }} href={siteConfig.url.youtube} target='_blank'>YouTube</Link>
      </Stack>

      <Stack display={['flex', 'flex', 'none']} color='gray.400' fontWeight={600} spacing={0}>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/roadmaps'>Roadmaps</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/guides'>Guides</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/watch'>Videos</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/about'>About</Link>
        <Link py='7px' _hover={{ color: 'white' }} target='_blank'
              href={siteConfig.url.youtube}>YouTube</Link>
      </Stack>
    </>
  );
}

export function Footer() {
  return (
    <Box bg='brand.hero' p={['25px 0', '25px 0', '40px 0']}>
      <Container maxW='container.md'>
        <NavigationLinks />

        <SimpleGrid mt={['40px', '40px', '50px']} mb='40px' gap={['40px', '40px', '75px']} columns={[1, 1, 2, 2]}
                    justifyContent='space-between'>
          <Box maxWidth={'550px'}>
            <Flex gap={0} alignItems='center' color='gray.400'>
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

          <Box maxWidth={'550px'} textAlign={['left', 'left', 'right']}>
            <Link display='flex' justifyContent={['flex-start', 'flex-start', 'flex-end']} fontWeight={600}
                  _hover={{ textDecoration: 'none', color: 'white' }}
                  href='https://thenewstack.io?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Footer'
                  target='_blank'>
              <Image alt='' w='195px' src='/tns.png' />
            </Link>

            <Text my='15px' fontSize='14px' color='gray.500'>The leading DevOps resource for Kubernetes, cloud-native
              computing, and the latest in at-scale development, deployment, and management.</Text>

            <Text fontSize='14px' color='gray.500'>
              <Link
                href='https://thenewstack.io/category/devops/?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Footer'
                target='_blank'
                _hover={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  event({
                    category: 'PartnerClick',
                    action: `TNS Referral`,
                    label: `TNS Referral - Footer`,
                  });
                }}
                color='gray.400' mx='10px' ml={['0', '0', '10px']}>DevOps</Link>&middot;
              <Link
                href='https://thenewstack.io/category/kubernetes/?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Footer'
                target='_blank' _hover={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  event({
                    category: 'PartnerClick',
                    action: `TNS Referral`,
                    label: `TNS Referral - Footer`,
                  });
                }}
                color='gray.400' mx='10px'>Kubernetes</Link>&middot;
              <Link
                href='https://thenewstack.io/category/cloud-native/?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Footer'
                target='_blank' _hover={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  event({
                    category: 'PartnerClick',
                    action: `TNS Referral`,
                    label: `TNS Referral - Footer`,
                  });
                }}
                color='gray.400' mx='10px'>Cloud-Native</Link>
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      <CustomAd />
    </Box>
  );
}
