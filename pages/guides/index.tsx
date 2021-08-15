import { Badge, Box, Button, Container, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { Header } from '../../components/header';
import { LinksList } from '../../components/links-list';
import { LinksListItem } from '../../components/links-list-item';
import { OpensourceBanner } from '../../components/opensource-banner';
import { UpdatesBanner } from '../../components/updates-banner';
import { Footer } from '../../components/footer';
import { GuideGridItem } from './components/guide-grid-item';

export default function Guides() {
  return (
    <Box bg='white' minH='100vh'>
      <Header />
      <Box mb='60px'>
        <Box pt='45px' pb='30px' borderBottomWidth={1}>
          <Container maxW='container.md' position='relative'>
            <Heading as='h1' color='black' fontSize='35px' fontWeight={700} mb='5px'>Visual Guides</Heading>
            <Text fontSize='15px'>Succinct graphical explanations to development related topics.</Text>
          </Container>
        </Box>
        <Container maxW='container.md' position='relative' mt='30px'>
          <Stack isInline mb='30px' spacing='15px'>
            <GuideGridItem
              title='Session Based Authentication'
              subtitle='Learn what the Session Based Authentication is, the pros and cons.'
              date='June 25, 2021'
              isNew
            />
            <GuideGridItem
              title='JSON Web Tokens'
              subtitle='Learn what the Session Based Authentication is, the pros and cons and how you can implement it in your apps.'
              date='June 25, 2021'
              colorIndex={1}
            />
          </Stack>

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
