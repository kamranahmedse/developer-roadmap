import { RoadmapType } from '../../lib/roadmap';
import { NewAlertBanner } from './new-alert-banner';
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AtSignIcon, DownloadIcon } from '@chakra-ui/icons';
import React from 'react';

type RoadmapPageHeaderType = {
  roadmap: RoadmapType;
};

export function RoadmapPageHeader(props: RoadmapPageHeaderType) {
  const { roadmap } = props;

  return (
    <Box
      pt={['25px', '20px', '45px']}
      pb={['20px', '15px', '30px']}
      borderBottomWidth={1}
      mb="30px"
    >
      <Container maxW="container.md" position="relative">
        <NewAlertBanner />
        <Heading
          as="h1"
          color="black"
          fontSize={['28px', '33px', '40px']}
          fontWeight={700}
          mb={['2px', '2px', '5px']}
        >
          {roadmap.title}
        </Heading>
        <Text fontSize={['13px', '14px', '15px']}>{roadmap.description}</Text>
        <Stack mt="20px" isInline>
          <Button
            d={['flex', 'flex']}
            as={Link}
            href={'/roadmaps'}
            size="xs"
            py="14px"
            px="10px"
            colorScheme="teal"
            variant="solid"
            _hover={{ textDecoration: 'none' }}
          >
            &larr;
            <Text as="span" d={['none', 'inline']} ml="5px">
              All Roadmaps
            </Text>
          </Button>

          {roadmap.pdfUrl && (
            <Button
              as={Link}
              href={roadmap.pdfUrl}
              target="_blank"
              size="xs"
              py="14px"
              px="10px"
              leftIcon={<DownloadIcon />}
              colorScheme="yellow"
              variant="solid"
              _hover={{ textDecoration: 'none' }}
            >
              Download
            </Button>
          )}
          <Button
            as={Link}
            href={'/signup'}
            size="xs"
            py="14px"
            px="10px"
            leftIcon={<AtSignIcon />}
            colorScheme="yellow"
            variant="solid"
            _hover={{ textDecoration: 'none' }}
          >
            Subscribe
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
