import React from 'react';
import { ListItem, UnorderedList } from '@chakra-ui/react';

type LiProps = {
  children: React.ReactNode;
};

export default function Li(props: LiProps) {
  return (
    <ListItem mb='7px'>
      {props.children}
    </ListItem>
  );
}
