import { Badge, Link, Text } from '@chakra-ui/react';
import siteConfig from '../../content/site.json';
import { event } from '../../lib/gtag';
import React from 'react';

export function NewAlertBanner() {
  return (
    <Text
      _hover={{
        textDecoration: 'none',
        color: 'blue.700',
        '& .new-badge': { bg: 'blue.700' },
      }}
      as={Link}
      href={siteConfig.url.youtube}
      d="block"
      target="_blank"
      color="red.700"
      fontSize="sm"
      mb="10px"
      fontWeight={500}
      onClick={() =>
        event({
          category: 'Subscription',
          action: 'Clicked the YouTube banner',
          label: 'YouTube Alert on Roadmap',
        })
      }
    >
      <Badge
        transition={'all 300ms'}
        className="new-badge"
        mr="7px"
        colorScheme="red"
        variant="solid"
      >
        New
      </Badge>
      <Text textDecoration="underline" as="span" d={['none', 'inline']}>
        Roadmap topics to be covered on our YouTube Channel
      </Text>
      <Text textDecoration="underline" as="span" d={['inline', 'none']}>
        Topic videos being made on YouTube
      </Text>
      <Text as="span" ml="5px">
        &raquo;
      </Text>
    </Text>
  );
}
