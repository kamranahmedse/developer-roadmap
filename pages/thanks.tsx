import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import siteConfig from '../content/site.json';
import Helmet from '../components/helmet';

export default function Thanks() {
  return (
    <Box bg='gray.50' minH='100vh'>
      <GlobalHeader />
      <Helmet title={'Thanks to Sponsors'} />
      <Box mb='60px'>
        <Container maxW={'container.sm'} position='relative'>
          <Box mt='60px'>
            <Flex alignItems='center'>
              <Box width='100%'>
                <Heading mb='10px' fontWeight={700}>Thanks!</Heading>
                <Text>The project has been made possible by all the wonderful humans and companies supporting the
                  project on <Link
                    fontWeight={600} textDecoration='underline' href={siteConfig.url.sponsor} target='_blank'>GitHub
                    Sponsors</Link> and we are truly
                  grateful for that.</Text>
              </Box>
              <Image width='190px'
                     alt={''}
                     rounded='100%'
                     src='https://media.giphy.com/media/l0HUgXEoxsNZjZNq8/giphy.gif?cid=790b76114c74e11ed7ce8d65995b6893524407ed7b7748bc&rid=giphy.gif&ct=g'
                     ml='50px'
                     d={['none', 'block']}
              />
            </Flex>

            <Box mt='30px'>
              <Heading mb='15px' fontSize='25px' as='h2'>Companies</Heading>

              <Stack spacing='10px'>
                <Box as={Link} rel='sponsored' href='https://www.doppler.com/?utm_campaign=github_repo&utm_medium=referral&utm_content=kamranahmedse&utm_source=github' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='400px'
                    src='https://dashboard.doppler.com/imgs/logo-long.svg'
                  />
                </Box>
                <Box as={Link} rel='sponsored' href='https://workos.com/?utm_campaign=github_repo&utm_medium=referral&utm_content=developer_roadmap&utm_source=github' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                      alt=''
                      w='400px'
                      src='/sponsors/workos-logo.svg'
                  />
                </Box>
                <Box as={Link} rel='sponsored' href='https://oss.capital/' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='400px'
                    src='/sponsors/oss-capital-logo.svg'
                  />
                </Box>
                <Box as={Link} rel='sponsored' href='https://getform.io/' target='_blank' borderWidth={1} bg='black' borderRadius='5px' p='20px'>
                  <Image
                    alt=''
                    w='400px'
                    src='https://i.imgur.com/5z2LGug.png'
                  />
                </Box>
                <Box as={Link} rel='sponsored' href='https://studio3t.com/' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='300px'
                    src='/sponsors/studio3t.png'
                  />
                </Box>
              </Stack>
            </Box>

            <Box mt='40px'>
              <Heading mb='15px' fontSize='25px' as='h2'>Monthly Sponsors</Heading>
              <UnorderedList>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/little-huang'>little-huang</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/pathorman'>Patricio Silva</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Luluutz'>Lulu</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/shedoks'>shedoks</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/yuriburger'>Yuri Burger</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Stuart-cmd'>Stuart Bowles</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/danielgruesso'>Daniel Gruesso</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/megalith-elisity'>Megalith</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/andrew-werdna'>Andrew Brown</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/pluo'>Pluo Jobs</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/mrxinu'>Steve Klassen</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/alfredoparreiras'>Alfredo Parreira</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/timegated'>Daniel Beccaria</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/greg-s-miller'>Greg Miller</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/scooby-moo'>Scooby Moo</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Dieer2'>Dieer2</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/around'>Around</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/skyhatch'>Ash P</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/ricardolino'>Ricardo Lino</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Nenzyz'>Yan Valuyskiy</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/idjevm'>Josue V</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Novecento88'>Novecento88</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/gmzabos'>Gerald-Markus Zabos</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/abebars'>Ahmed Bebars</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://twitter.com/hassanabudu'>Hassan Abudu</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/josephjacks'>Joseph
                  Jacks</Link></ListItem>
              </UnorderedList>
            </Box>

            <Box mt='40px'>
              <Heading mb='15px' fontSize='25px' as='h2'>Past or One Time Sponsors</Heading>
              <UnorderedList>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/mvuljevas'>Mauricio Vuljevas</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/mikekornegay'>mikekornegay</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/timaskwhy'>Tim Wong</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/MedusaNick'>Nicklas Gellner</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/hzine'>HZine</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/rh-raju'>Reajul Hasan Raju</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/jgrochulski'>Jan Grochulski</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/francispeixoto'>Francis Peixoto</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/imReset'>Reset</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/logreg-n-coffee'>Rui Hu</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/kevin-bog'>Kevin Bot</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/werber'>Myroslav</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/MustafaMagdi'>Mustafa
                  Magdi</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/JacobPEvans'>Jacob P Evans</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/shaman771'>Oleg</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/aimuch'>Andy</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/elzup'>elzup</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/nikasakandelidze'>sakana</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/m-elkady'>Mohammed Elkady</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/rekhubs'>rekhubs</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/carlosgarita'>Carlos Garita</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/mesripour'>Mohamad Mesripour</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/matiasinsaurralde'>Matias Insaurralde</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Lazy-AL'>Anri
                  Lazash</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/liquidaty'>Liquidaty</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/dmytbolko'>Dmytro
                  Bolkachov</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/MelnikovAG'>Alexander
                  Blake</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/falizhar'>Falah Sultan Alizhar</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/mian-muhammad'>Mian Muhammad</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://digitalocean.com'>DigitalOcean</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/gabcvit'>Gabriel
                  Checchia</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/hadasbro'>Slawomir
                  Hadas</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/tugotron'>Victor
                  Sevelev</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/matheusfelipeog'>Matheus
                  Felipe</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/emretanriverdi'>Emre
                  Tanriverdi</Link></ListItem>
              </UnorderedList>
            </Box>

            <Box mt='40px' borderWidth={1} padding='20px' rounded='5px'>
              <Heading as='h2' mb='10px'>Support the Project</Heading>
              <Text mb='15px'>Sponsor me on GitHub to help ensure the continuity of the project.</Text>
              <Button _hover={{ textDecoration: 'none' }} as={Link} href={siteConfig.url.sponsor} colorScheme='green'>Sponsor
                me on GitHub</Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <OpensourceBanner />
      <Footer />
    </Box>
  );
}
