import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton, MenuItem,
  MenuList,
  Stack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

type MenuLinkProps = {
  text: string;
  link: string;
};

function MenuLink(props: MenuLinkProps) {
  const { text, link } = props;

  return <Link
    borderBottomWidth={0}
    borderBottomColor='gray.500'
    _hover={{ textDecoration: 'none', borderBottomColor: 'white' }}
    fontWeight={500}
    href={link}
  >
    {text}
  </Link>;
}

function DesktopMenuLinks() {
  return (
    <Stack d={['none', 'flex', 'flex']} shouldWrapChildren isInline spacing='15px' alignItems='center' color='gray.50'
           fontSize='15px'>
      <MenuLink text={'Roadmaps'} link={'/roadmaps'} />
      <MenuLink text={'Guides'} link={'/guides'} />
      <MenuLink text={'Videos'} link={'/watch'} />

      <Link ml='10px' bgGradient='linear(to-l, yellow.700, red.600)' p='7px 10px' rounded='4px'
            _hover={{ textDecoration: 'none', bgGradient: 'linear(to-l, red.800, yellow.700)' }}
            fontWeight={500} href={'#'}>Subscribe</Link>
    </Stack>
  );
}

function MobileMenuLinks() {
  return (
    <Menu>
      <MenuButton
        d={['block', 'none', 'none']}
        as={HamburgerIcon}
        aria-label='Options'
        variant='outline'
        color='white' w='22px' height='22px'
        cursor='pointer'
      />
      <MenuList py={'4px'} rounded='3px' minWidth='150px'>
        <MenuItem py='4px' borderColor='gray.100' borderBottomWidth={1} fontSize='13px' color='gray.600'>Roadmaps</MenuItem>
        <MenuItem py='4px' borderColor='gray.100' borderBottomWidth={1} fontSize='13px' color='gray.600'>Guides</MenuItem>
        <MenuItem py='4px' borderColor='gray.100' borderBottomWidth={1} fontSize='13px' color='gray.600'>Videos</MenuItem>
        <MenuItem py='4px' borderColor='gray.100' fontSize='13px' color='gray.600'>Subscribe</MenuItem>
      </MenuList>
    </Menu>
  );
}

export function GlobalHeader() {
  return (
    <Box bg='gray.900' p='20px 0'>
      <Container maxW='container.md'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Link w='100%'
                d='flex'
                href='/'
                alignItems='center'
                color='white'
                fontWeight={600}
                _hover={{ textDecoration: 'none' }}
                fontSize='18px'>
            <Image h='30px' w='30px' src='/logo.svg' mr='10px' />
            <Text d={['none', 'none', 'block']} as='span'>roadmap.sh</Text>
          </Link>
          <DesktopMenuLinks />
          <MobileMenuLinks />
        </Flex>
      </Container>
    </Box>
  );
}
