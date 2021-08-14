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
      fontWeight={500}
      color='gray.600'
      alignItems='center'
      justifyContent={'space-between'}
      _hover={{
        textDecoration: 'none',
        color: 'blue.400',
        '& .list-item-title': {
          transform: 'translateX(10px)'
        }
      }}
    >
      <Flex alignItems='center' className='list-item-title' transition={'200ms'}>
        {icon}
        <Text as='span'>{title}</Text>
        {badgeText &&
        <Badge pos='relative' top='1px' variant='subtle' colorScheme='purple' ml='10px'>{badgeText}</Badge>}
      </Flex>
      <Text as='span' fontSize='13px' color='gray.500'>{subtitle}</Text>
    </Link>
  );
}
