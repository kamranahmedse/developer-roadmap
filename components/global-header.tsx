import { useState } from 'react';
import { useRouter } from 'next/router';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import RoadmapLogo from '../components/icons/roadmap.svg';
import siteConfig from '../content/site.json';

interface MenuLinkProps {
  active: boolean;
  text: string;
  link: string;
}

interface NavItemsProps {
  mobile?: boolean;
}

function MenuLink({ active, text, link }: MenuLinkProps) {
  return (
    <Link
      color={active ? 'white' : 'gray.400'}
      borderBottomWidth={0}
      borderBottomColor="gray.500"
      _hover={{ textDecoration: 'none', borderBottomColor: 'white' }}
      fontWeight={500}
      href={link}
    >
      {text}
    </Link>
  );
}

const NavItems = ({ mobile }: NavItemsProps) => {
  const router = useRouter();

  const links: { name: string; href: string }[] = [
    { name: 'Roadmaps', href: '/roadmaps' },
    { name: 'Guides', href: '/guides' },
    { name: 'Videos', href: '/watch' },
    { name: 'Thanks', href: '/thanks' },
  ];

  return (
    <>
      {mobile ? (
        <>
          {links.map((link) => (
            <MenuLink
              active={router.pathname == link.href}
              text={link.name}
              link={link.href}
            />
          ))}
          <Link
            ml="10px"
            bgGradient="linear(to-l, yellow.700, red.600)"
            p="7px 10px"
            rounded="4px"
            _hover={{
              textDecoration: 'none',
              bgGradient: 'linear(to-l, red.800, yellow.700)',
            }}
            fontWeight={500}
            href={'/signup'}
          >
            Subscribe
          </Link>
        </>
      ) : (
        <Stack
          d={['none', 'flex', 'flex']}
          shouldWrapChildren
          isInline
          spacing="15px"
          alignItems="center"
          color="gray.50"
          fontSize="15px"
        >
          {links.map((link) => (
            <MenuLink
              active={router.pathname == link.href}
              text={link.name}
              link={link.href}
            />
          ))}
          <Link
            ml="10px"
            bgGradient="linear(to-l, yellow.700, red.600)"
            p="7px 10px"
            rounded="4px"
            _hover={{
              textDecoration: 'none',
              bgGradient: 'linear(to-l, red.800, yellow.700)',
            }}
            fontWeight={500}
            href={'/signup'}
          >
            Subscribe
          </Link>
        </Stack>
      )}
    </>
  );
};

function DesktopMenuLinks() {
  return <NavItems />;
}

function MobileMenuLinks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        rounded="5px"
        padding={0}
        aria-label={'Menu'}
        d={['block', 'none', 'none']}
        icon={<HamburgerIcon color="white" w="25px" height="25px" />}
        color="white"
        cursor="pointer"
        h="auto"
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        _focus={{ bg: 'transparent' }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Stack
          color="gray.100"
          fontSize={['22px', '22px', '22px', '32px']}
          alignItems="center"
          justifyContent="center"
          pos="fixed"
          left={0}
          right={0}
          bottom={0}
          top={0}
          bg="gray.900"
          spacing="12px"
          zIndex={999}
        >
          <CloseButton
            onClick={() => setIsOpen(false)}
            pos="fixed"
            top="40px"
            right="15px"
            size="lg"
          />
          <NavItems mobile />
        </Stack>
      )}
    </>
  );
}

type GlobalHeaderProps = {
  variant?: 'transparent' | 'solid';
};

export function GlobalHeader(props: GlobalHeaderProps) {
  const { variant = 'solid' } = props;

  return (
    <Box bg={variant === 'solid' ? 'gray.900' : 'transparent'} p="20px 0">
      <Container maxW="container.md">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link
              w="100%"
              d="flex"
              href="/"
              alignItems="center"
              color="white"
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              fontSize="18px"
            >
              <RoadmapLogo
                style={{ height: '30px', width: '30px', marginRight: '10px' }}
              />
              <Text d={['block', 'none', 'block']} as="span">
                roadmap.sh
              </Text>
            </Link>
          </Box>
          <DesktopMenuLinks />
          <MobileMenuLinks />
        </Flex>
      </Container>
    </Box>
  );
}
