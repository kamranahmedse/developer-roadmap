import React from 'react';
import { Text } from '@chakra-ui/react';

type EnrichedTextType = {
  children: React.ReactNode;
}

export default function EnrichedText(props: EnrichedTextType) {
  return <Text lineHeight='27px' fontSize='16px' color='black' mb='18px'>{props.children}</Text>;
}
