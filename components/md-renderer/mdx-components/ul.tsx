import React from 'react';
import { UnorderedList } from '@chakra-ui/react';

type OlProps = {
  children: React.ReactNode;
};

export default function Ul(props: OlProps) {
  return (
    <UnorderedList ml='40px' mb='18px'>
      {props.children}
    </UnorderedList>
  );
}
