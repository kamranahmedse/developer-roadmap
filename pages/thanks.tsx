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
import { UpdatesBanner } from '../components/updates-banner';
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
                <Text>The project has been made possible by the all the wonderful humans and companies supporting the
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
                <Box as={Link} href='https://oss.capital/' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='400px'
                    src='/sponsors/oss-capital-logo.svg'
                  />
                </Box>
                <Box as={Link} href='https://studio3t.com/' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='300px'
                    src='/sponsors/studio3t.png'
                  />
                </Box>
                <Box as={Link} href='https://park.io' _hover={{ textDecoration: 'none' }} target='_blank'
                     borderWidth={1}
                     borderRadius='5px' p='10px 25px' bg='#3d157a' color='white'>
                  <Text fontWeight={700} fontSize='55px'>park.io</Text>
                </Box>
                <Box as={Link} href={'https://forbes.com'} _hover={{ textDecoration: 'none' }} target='_blank'
                     borderWidth={1}
                     borderRadius='5px' p='20px' bg='#231f20'>
                  <Image
                    alt=''
                    w='250px'
                    src='/sponsors/forbes-logo.png'
                  />
                </Box>
                <Box as={Link} href='https://zalando.de' target='_blank' borderWidth={1} borderRadius='5px' p='20px'
                     bg='teal.50'>
                  <Image
                    alt=''
                    w='300px'
                    src='/sponsors/zalando-logo.svg'
                  />
                </Box>
              </Stack>
            </Box>

            <Box mt='40px'>
              <Heading mb='15px' fontSize='25px' as='h2'>Monthly Sponsors</Heading>
              <UnorderedList>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Novecento88'>Novecento88</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/werber'>Myroslav</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/gmzabos'>Gerald-Markus Zabos</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/abebars'>Ahmed Bebars</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://twitter.com/hassanabudu'>Hassan Abudu</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/Stuart-cmd'>Stuart Bowles</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/josephjacks'>Joseph
                  Jacks</Link></ListItem>
                <ListItem mb='5px'><Link color='blue.500' target='_blank' fontWeight={500}
                                         href='https://github.com/MustafaMagdi'>Mustafa
                  Magdi</Link></ListItem>
              </UnorderedList>
            </Box>

            <Box mt='40px'>
              <Heading mb='15px' fontSize='25px' as='h2'>Past or One Time Sponsors</Heading>
              <UnorderedList>
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
      <UpdatesBanner />
      <Footer />
    </Box>
  );
}
