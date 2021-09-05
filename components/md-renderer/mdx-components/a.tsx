import React from 'react';
import styled from 'styled-components';

type EnrichedLinkProps = {
  href: string;
  children: React.ReactNode
}

const Link = styled.a`
  font-weight: 600;
  text-decoration: underline;
`;

const EnrichedLink = (props: EnrichedLinkProps) => {
  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(props.href);

  return (
    <Link href={props.href} target={isExternalUrl ? '_blank' : '_self'}>
      {props.children}
    </Link>
  );
};

export default EnrichedLink;

