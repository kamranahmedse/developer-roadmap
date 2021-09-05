import { Box, Container, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

type ContentPageHeaderProps = {
  formattedDate: string;
  title: string;
  subtitle: string;
  author?: {
    name: string;
    twitter: string;
    picture: string;
  },
  subLink?: {
    text: string;
    url: string;
  }
};

export function ContentPageHeader(props: ContentPageHeaderProps) {
  const { title, subtitle, author = null, formattedDate, subLink = null } = props;

  return (
    <Box pt={['35px', '35px', '70px']} pb={['35px', '35px', '55px']} borderBottomWidth={1} mb='30px'>
      <Container maxW='container.md' position='relative' textAlign={['left', 'left', 'center']}>
        <Flex alignItems='center' justifyContent={['flex-start', 'flex-start', 'center']}
              fontSize={['12px', '12px', '14px']}>

          {author?.name && (
            <>
              <Link
                d={['none', 'flex', 'flex']}
                target='_blank'
                href={`https://twitter.com/${author.twitter}`}
                alignItems='center'
                fontWeight={600}
                color='gray.500'
              >
                <Image alt={''} rounded={'full'} mr='7px' w='22px' src={author.picture} />
                {author.name}
              </Link>
              <Text d={['none', 'inline', 'inline']} mx='7px' color='gray.500' as='span'>&middot;</Text>
            </>
          )}

          <Text color='gray.500' as='span'>{formattedDate}</Text>
          {subLink?.text && (
            <>
              <Text d={['none', 'none', 'inline']} mx='7px' color='gray.500' as='span'>&middot;</Text>
              <Link d={['none', 'none', 'inline']} color='blue.500' fontWeight={500}
                    href={subLink.url} target={'_blank'}>{subLink.text}</Link>
            </>
          )}
        </Flex>
        <Heading as='h1' color='black' fontSize={['30px', '30px', '45px']} lineHeight={['40px', '40px', '53px']}
                 fontWeight={700} my={['5px', '5px', '10px']}>{title}</Heading>
        <Text fontSize={['14px', '14px', '16px']} color='gray.700'>{subtitle}</Text>
      </Container>
    </Box>
  );
}
