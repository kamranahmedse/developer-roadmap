import React from 'react';
import { Heading } from '@chakra-ui/react';

type ResourceGroupTitleProps = {
  children: React.ReactNode;
};

export function ResourceGroupTitle(props: ResourceGroupTitleProps) {
  const { children } = props;

  return <Heading mt='20px' color='gray.800' fontSize='14px' pb='5px' borderBottomWidth={1} textTransform='uppercase' as="h2" mb={'10px'}>{children}</Heading>;
}
