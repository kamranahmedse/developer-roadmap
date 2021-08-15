import { Badge, Box, Button, Container, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { Header } from '../../components/header';
import { LinksList } from '../../components/links-list';
import { LinksListItem } from '../../components/links-list-item';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';

export default function Guides() {
  return (
    <Box bg='white' minH='100vh'>
      <Header />
      <Box mb='60px'>
        <Box pt='50px' pb='30px' borderBottomWidth={1}>
          <Container maxW='container.md' position='relative'>
            <Heading as='h1' color='black' fontSize='40px' fontWeight={700} mb='5px'>Visual Guides</Heading>
            <Text>Succinct graphical explanations to development related topics.</Text>
          </Container>
        </Box>
        <Container maxW='container.md' position='relative'>
          <Badge mt='40px' mb='10px' variant='solid' colorScheme='green'>Recent Guides</Badge>
          {/*<Text mt='40px' mb='10px' fontWeight={700} color='green.500'>Recent Guides</Text>*/}
          {/*<Heading mt='40px' mb='15px' color='green.500' fontSize='20px'>Recent Guides</Heading>*/}
          <Stack isInline mb='30px' spacing='15px'>
            <Link _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} as={Box} href='#' shadow='xl' p='20px' py='25px' rounded='10px' bg={'gray.700'} flex={1}>
              <Text mb='10px' fontSize='13px' color='gray.400'>June 25, 2021</Text>
              <Heading color='white' mb={'6px'} fontSize='22px'>Session Based Authentication</Heading>
              <Text color='gray.300' fontSize='14px'>Learn what the Session Based Authentication is, the pros and cons
                .</Text>
            </Link>

            <Link _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }} as={Box} href='#' shadow='xl' p='20px' py='25px' rounded='10px' bg={'purple.800'} flex={1}>
              <Text mb='10px' fontSize='13px' color='gray.400'>June 25, 2021</Text>
              <Heading color='white' mb={'6px'} fontSize='22px'>JSON Web Tokens</Heading>
              <Text color='gray.300' fontSize='14px'>Learn what the Session Based Authentication is, the pros and cons
                and how you can implement it in your
                apps.</Text>
            </Link>
          </Stack>

          <Badge mt='30px' mb='10px' variant='solid' colorScheme='green'>Past Guides</Badge>
          <LinksList>
            <LinksListItem title='Session based Authentication' badgeText='pro' subtitle='June 12, 2021' />
            <LinksListItem title='Session based Authentication' subtitle='June 12, 2021' />
            <LinksListItem title='JSON Web Tokens' subtitle='June 05, 2021' />
            <LinksListItem title='Token Based Authentication' subtitle='May 15, 2021' />
            <LinksListItem title='Character Encodings' badgeText='pro' subtitle='March 06, 2021' />
            <LinksListItem title='SSL vs TLS vs HTTPs vs SSH' subtitle='February 15, 2021' />
            <LinksListItem title='Continuous Integration and Deployment' subtitle='February 15, 2021' />
            <LinksListItem title='Authentication' subtitle='February 01, 2021' />
            <LinksListItem title='DHCP in One Picture' subtitle='February 01, 2021' />
            <LinksListItem title='Session Based Authentication' subtitle='February 01, 2021' />
            <LinksListItem title='Session based Authentication' badgeText='pro' subtitle='June 12, 2021' />
            <LinksListItem title='Session based Authentication' subtitle='June 12, 2021' />
            <LinksListItem title='JSON Web Tokens' subtitle='June 05, 2021' />
            <LinksListItem title='Token Based Authentication' subtitle='May 15, 2021' />
            <LinksListItem title='Character Encodings' badgeText='pro' subtitle='March 06, 2021' />
            <LinksListItem title='SSL vs TLS vs HTTPs vs SSH' subtitle='February 15, 2021' />
            <LinksListItem title='Continuous Integration and Deployment' subtitle='February 15, 2021' />
            <LinksListItem title='Authentication' subtitle='February 01, 2021' />
            <LinksListItem title='DHCP in One Picture' subtitle='February 01, 2021' />
            <LinksListItem title='Session Based Authentication' subtitle='February 01, 2021' />
          </LinksList>
        </Container>
      </Box>

      <OpensourceBanner />
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
