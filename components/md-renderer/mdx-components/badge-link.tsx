import React from 'react';
import { Link, Text, Badge } from '@chakra-ui/react';

type BadgeLinkType = {
  target: string;
  badgeText: string;
  href: string;
  colorScheme?: string;
  children: React.ReactNode
};

export function BadgeLink(props: BadgeLinkType) {
  const { target = '_blank', colorScheme='purple', badgeText, href, children } = props;

  return (
    <Text mb={0}>
      <Link color='blue.700' fontWeight={500} textDecoration='none' href={href} target={target} _hover={{ textDecoration: 'none', color: 'purple.400' }}>
        <Badge mr='10px' colorScheme={colorScheme} pos='relative' top='-2px'>{badgeText}</Badge>
        {children}
      </Link>
    </Text>
  );
}
