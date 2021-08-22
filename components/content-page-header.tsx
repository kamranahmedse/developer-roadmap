import { Box, Container, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

type GuideHeaderProps = {
  title: string;
  subtitle: string;
};

export function ContentPageHeader(props: GuideHeaderProps) {
  const { title, subtitle } = props;

  return (
    <Box pt='70px' pb='55px' borderBottomWidth={1} mb='30px' textAlign='center'>
      <Container maxW='container.md' position='relative' textAlign='center'>
        <Flex alignItems='center' justifyContent='center' fontSize='14px'>
          <Link href='#' d='flex' alignItems='center' fontWeight={600} color='gray.500'>
            <Image mr='7px' w='22px' src='https://github.com/kamranahmedse.png' />
            Kamran Ahmed
          </Link>
          <Text mx='7px' color='gray.500' as='span'>&middot;</Text>
          <Text color='gray.500' as='span'>Monday, May 4, 2021</Text>
          <Text mx='7px' color='gray.500' as='span'>&middot;</Text>
          <Link color='blue.500' fontWeight={500} href='#'>Improve this Guide</Link>
        </Flex>
        <Heading as='h1' color='black' fontSize='45px' fontWeight={700} my='10px'>{title}</Heading>
        <Text fontSize='16px' color='gray.700'>{subtitle}</Text>
      </Container>
    </Box>
  );
}
