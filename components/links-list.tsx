import React from 'react';
import { StackDivider, VStack } from '@chakra-ui/react';

type LinksListProps = {
  children: React.ReactNode
};

export function LinksList(props: LinksListProps) {
  const { children } = props;

  return (
    <VStack
      rounded='5px'
      divider={<StackDivider borderColor='gray.200' />}
      spacing={0}
      align='stretch'
    >
      {children}
    </VStack>
  );
}
