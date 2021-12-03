import { RoadmapType } from '../../lib/roadmap';
import { NewAlertBanner } from './new-alert-banner';
import { Button, Link, Stack, Text } from '@chakra-ui/react';
import { AtSignIcon, DownloadIcon } from '@chakra-ui/icons';
import { PageHeader } from '../page-header';
import React from 'react';

type RoadmapPageHeaderType = {
  roadmap: RoadmapType;
}

export function RoadmapPageHeader(props: RoadmapPageHeaderType) {
  const { roadmap } = props;

  return (
    <PageHeader
      beforeTitle={<NewAlertBanner />}
      title={roadmap.title}
      subtitle={roadmap.description}
    >
      <Stack mt='20px' isInline>
        <Button d={['flex', 'flex']} as={Link} href={'/roadmaps'} size='xs' py='14px' px='10px'
                colorScheme='teal' variant='solid' _hover={{ textDecoration: 'none' }}>
          &larr; <Text as='span' d={['none', 'inline']} ml='5px'>All Roadmaps</Text>
        </Button>

        {roadmap.pdfUrl && (
          <Button as={Link}
                  href={roadmap.pdfUrl}
                  target='_blank'
                  size='xs'
                  py='14px'
                  px='10px'
                  leftIcon={<DownloadIcon />}
                  colorScheme='yellow'
                  variant='solid'
                  _hover={{ textDecoration: 'none' }}>
            Download
          </Button>
        )}
        <Button as={Link} href={'/signup'} size='xs' py='14px' px='10px' leftIcon={<AtSignIcon />}
                colorScheme='yellow' variant='solid' _hover={{ textDecoration: 'none' }}>
          Subscribe
        </Button>
      </Stack>
    </PageHeader>
  );
}
