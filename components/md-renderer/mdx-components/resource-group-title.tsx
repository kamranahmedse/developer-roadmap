import React from 'react';
import { Heading } from '@chakra-ui/react';

type ResourceGroupTitleProps = {
  children: React.ReactNode;
};

export function ResourceGroupTitle(props: ResourceGroupTitleProps) {
  const { children } = props;

  return <Heading fontSize='22px' as="h2" mb={'10px'}>{children}</Heading>;
}
