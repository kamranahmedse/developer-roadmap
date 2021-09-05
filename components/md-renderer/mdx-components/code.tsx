import React from 'react';
import { Code as ChakraCode } from '@chakra-ui/react';

type CodeType = {
  children: React.ReactNode;
}

export default function Code(props: CodeType) {
  return <ChakraCode bg='blue.500'>{props.children}</ChakraCode>;
}
