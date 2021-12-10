import React from 'react';
import { Link, Text, Badge } from '@chakra-ui/react';

type BadgeLinkType = {
  target: string;
  badgeText: string;
  href: string;
  colorScheme?: string;
  children: React.ReactNode;
};

export function BadgeLink(props: BadgeLinkType) {
  const {
    target = '_blank',
    colorScheme = 'purple',
    badgeText,
    href,
    children,
  } = props;

  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(
    props.href
  );

  const linkProps: Record<string, string> = {
    ...(isExternalUrl
      ? {
          rel: 'nofollow',
        }
      : {}),
  };

  return (
    <Text mb={'0px'}>
      <Link
        fontSize="14px"
        color="blue.700"
        fontWeight={500}
        textDecoration="none"
        href={href}
        target={target}
        _hover={{ textDecoration: 'none', color: 'purple.400' }}
        {...linkProps}
      >
        <Badge fontSize="11px" mr="7px" colorScheme={colorScheme}>
          {badgeText}
        </Badge>
        {children}
      </Link>
    </Text>
  );
}
