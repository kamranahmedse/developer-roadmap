import React from 'react';
import { Link, Text, Badge } from '@chakra-ui/react';

type BadgeLinkType = {
  target: string;
  badgeText: string;
  href: string;
  children: React.ReactNode
};

export function BadgeLink(props: BadgeLinkType) {
  const { target = '_blank', badgeText, href, children } = props;

  return (
    <Text mb={0}>
      <Link fontWeight={500} textDecoration='underline' href={href} target={target}>
        <Badge colorScheme={'purple'} style={{ position: 'relative', top: '-2px' }}>{badgeText}</Badge> {children}
      </Link>
    </Text>
  );
}
