import React from 'react';
import styled from 'styled-components';

type EnrichedLinkProps = {
  href: string;
  children: React.ReactNode;
};

const Link = styled.a`
  font-weight: 600;
  text-decoration: underline;
`;

const EnrichedLink = (props: EnrichedLinkProps) => {
  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(
    props.href
  );

  const linkProps: Record<string, string> = {
    target: '_self',
    ...(isExternalUrl
      ? {
          rel: 'nofollow',
          target: '_blank',
        }
      : {}),
  };

  return (
    <Link href={props.href} {...linkProps}>
      {props.children}
    </Link>
  );
};

export default EnrichedLink;
