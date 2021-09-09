import { Flex, Link, Text } from '@chakra-ui/react';
import YouTubeLogo from '../components/icons/youtube.svg';
import siteConfig from '../content/site.json';

export function StickyBanner() {
  return (
    <Flex as={Link}
          href={siteConfig.url.youtube}
          bg={'yellow.300'}
          color='gray.900'
      // bg={'teal.900'}
      // color='gray.300'
          alignItems='center'
          position='fixed'
          left={0}
          right={0}
          zIndex={999}
          justifyContent='center'
          py='8px'
          _hover={{ textDecoration: 'none', bg: 'yellow.400' }}
      // _hover={{ textDecoration: 'none', bg: 'teal.800', color: 'gray.100' }}
          target='_blank'
    >
      <YouTubeLogo style={{ height: '20px', display: 'inline-block', marginRight: '7px' }} />
      <Text as='span' fontWeight={500} fontSize='14px'>
        <Text as='span'>We now have a YouTube Channel. <Text as='span' d={['none', 'inline']}>Subscribe for the video
          content.</Text></Text>
      </Text>
    </Flex>
  );
}
