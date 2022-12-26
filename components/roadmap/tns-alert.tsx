import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import React from 'react';
import { event } from '../../lib/gtag';

type TNSAlertProps = {
  roadmapName: string;
};

export function TNSAlert(props: TNSAlertProps) {
  const { roadmapName } = props;

  return (
    <Text
      fontWeight={500}
      fontSize='14px'
      bg='gray.100'
      p='5px 7px'
      rounded='2px 2px 0 0'
      borderBottomWidth={1}
    >
      <Box as='span' display={['none', 'none', 'inline']}>Get the latest {roadmapName} news from our sister site&nbsp;
        <Link
          href={'https://thenewstack.io?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Banner'}
          target='_blank' textDecoration='underline'
          onClick={() => {
            event({
              category: 'PartnerClick',
              action: `TNS Referral`,
              label: `TNS Referral - ${roadmapName}`,
            });
          }}
          fontWeight={600}>TheNewStack.io <ExternalLinkIcon />
        </Link>
      </Box>
      <Box as='span' display={['inline', 'inline', 'none']}>Get latest {roadmapName} news on &nbsp;
        <Link
          href={'https://thenewstack.io?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Banner'}
          target='_blank' textDecoration='underline'
          onClick={() => {
            event({
              category: 'PartnerClick',
              action: `TNS Referral`,
              label: `TNS Referral - ${roadmapName}`,
            });
          }}
          fontWeight={600}>TheNewStack.io <ExternalLinkIcon />
        </Link>
      </Box>
    </Text>
  );
}
