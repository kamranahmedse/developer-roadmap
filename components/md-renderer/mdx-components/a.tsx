import React from 'react';
import { Link } from '@chakra-ui/react';

type EnrichedLinkProps = {
  href: string;
  children: React.ReactNode
}

export default function EnrichedLink(props: EnrichedLinkProps) {
  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(props.href);

  return (
    <Link fontWeight={600} href={props.href} target={isExternalUrl ? '_blank' : '_self'} textDecoration='underline'>
      {props.children}
    </Link>
  );
};
