import React from 'react';
import { Badge, Flex, Link, Text } from '@chakra-ui/react';

type LinksListItemProps = {
  title: string;
  subtitle: string;
  badgeText?: string;
  icon?: React.ReactChild
};

export function LinksListItem(props: LinksListItemProps) {
  const { title, subtitle, badgeText, icon } = props;

  return (
    <Link
      fontSize='15px'
      py='9px'
      d='flex'
      flexDirection={['column', 'row', 'row']}
      fontWeight={500}
      color='gray.600'
      alignItems={['flex-start', 'center']}
      justifyContent={'space-between'}
      _hover={{
        textDecoration: 'none',
        color: 'blue.400',
        '& .list-item-title': {
          transform: 'translateX(10px)'
        }
      }}
      isTruncated
      maxWidth='100%'
    >
      <Flex alignItems='center' className='list-item-title' transition={'200ms'}>
        {icon}
        <Text maxWidth={'345px'} isTruncated as='span'>{title}</Text>
        {badgeText &&
        <Badge pos='relative' top='1px' variant='subtle' colorScheme='purple' ml='10px'>{badgeText}</Badge>}
      </Flex>
      <Text mt={['4px', 0]} as='span' fontSize='12px' color='gray.500'>{subtitle}</Text>
    </Link>
  );
}
