import { Flex, Link, Text } from '@chakra-ui/react';
import YouTubeLogo from '../components/icons/youtube.svg';
import siteConfig from '../content/site.json';

export function StickyBanner() {
  return (
    <Flex as={Link}
          href={siteConfig.url.youtube}
          bg={'teal.900'}
          color='gray.300'
          alignItems='center'
          justifyContent='center'
          py='7px'
          _hover={{ textDecoration: 'none', bg: 'teal.800', color: 'gray.100' }}
          target='_blank'
    >
      <YouTubeLogo style={{ height: '20px', display: 'inline-block', marginRight: '7px' }} />
      <Text as='span' fontWeight={500} fontSize='14px'>
        <Text as='span' d={['none', 'block']}>Subscribe to our YouTube channel for the video content.</Text>
        <Text as='span' d={['block', 'none']}>We now have a YouTube Channel.</Text>
      </Text>
    </Flex>
  );
}
