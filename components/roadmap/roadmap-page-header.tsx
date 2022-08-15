import siteConfig from '../../content/site.json';
import { isInteractiveRoadmap, RoadmapType } from '../../lib/roadmap';
import { NewAlertBanner } from './new-alert-banner';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChatIcon, AtSignIcon, DownloadIcon } from '@chakra-ui/icons';
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
        <Flex justifyContent="space-between" alignItems={'center'} mt="20px">
          <Stack isInline flex={1}>
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
                d={['none', 'flex']}
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
              variant="solid"
              colorScheme="yellow"
              leftIcon={<AtSignIcon />}
              _hover={{ textDecoration: 'none' }}
            >
              Subscribe
            </Button>
            <Box flex={1} justifyContent='flex-end' d='flex'>
              <Button
                as={Link}
                href={`${siteConfig.url.issue}?title=[Suggestion] ${roadmap.title}`}
                target='_blank'
                size="xs"
                py="14px"
                px="10px"
                colorScheme="green"
                leftIcon={<ChatIcon />}
                _hover={{ textDecoration: 'none' }}
              >
                Suggest Changes
              </Button>
            </Box>
          </Stack>
        </Flex>
        {isInteractiveRoadmap(roadmap.id) && (
          <Text
            mt="30px"
            mb={['-37px', '-32px', '-47px']}
            fontWeight={500}
            fontSize="14px"
            bg="white"
            borderWidth={1}
            p="5px 7px"
            rounded="3px"
          >
            <Badge pos="relative" top={'-1px'} mr="6px" colorScheme="yellow">
              New
            </Badge>
            Resources are here, try clicking any nodes.
          </Text>
        )}
      </Container>
    </Box>
  );
}
