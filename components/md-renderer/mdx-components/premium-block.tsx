import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

type PremiumBlockProps = {
  title: string;
  description: string;
};

export default function PremiumBlock(props: PremiumBlockProps) {
  return (
    <Box p='40px' textAlign='center' rounded='5px' mb='18px' bg='gray.50' borderWidth={1}>
      <LockIcon color='gray.300' height='45px' w='45px' mb='18px' />
      <Heading as='h3' fontSize='30px' mb='10px'>{props.title}</Heading>
      <Text mb='18px'>{props.description}</Text>
      <Button colorScheme='green'>Become a Member</Button>
    </Box>
  );
}
