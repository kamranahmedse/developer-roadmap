import { Flex, Link, Text } from '@chakra-ui/react';
import YouTubeLogo from '../components/icons/youtube.svg';
import CloseIcon from '../components/icons/close.svg';
import siteConfig from '../content/site.json';
import { event } from '../lib/gtag';
import { useState } from 'react';

export function StickyBanner() {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <Flex
        as={Link}
        href={siteConfig.url.youtube}
        bg={'yellow.200'}
        color="gray.900"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={999}
        justifyContent="center"
        py="8px"
        _hover={{ textDecoration: 'none', bg: 'yellow.400' }}
        target="_blank"
        onClick={() =>
          event({
            category: 'Subscription',
            action: 'Clicked the YouTube banner',
            label: 'Sticky YouTube banner on Top',
          })
        }
      >
        <YouTubeLogo
          style={{
            height: '20px',
            display: 'inline-block',
            marginRight: '7px',
          }}
        />
        <Text as="span" fontWeight={500} fontSize="14px">
          <Text as="span">
            We now have a YouTube Channel.{' '}
            <Text as="span" d={['none', 'inline']}>
              Subscribe for the video content.
            </Text>
          </Text>
        </Text>
        <CloseIcon
          style={{ display: 'inline-block', height: '15px', marginLeft: '7px' }}
          onClick={() => setOpen(false)}
        />
      </Flex>
    )
  );
}
