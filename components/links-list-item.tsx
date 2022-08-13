import React from 'react';
import { Badge, Flex, Link, Text } from '@chakra-ui/react';

type LinksListItemProps = {
  href: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  target?: string;
  icon?: React.ReactChild;
  hideSubtitleOnMobile?: boolean;
};

export function LinksListItem(props: LinksListItemProps) {
  const { title, subtitle, badgeText, icon, hideSubtitleOnMobile = false, href, target } = props;

  return (
    <Link
      target={target || '_self'}
      href={href}
      fontSize={['14px', '14px', '15px']}
      py='9px'
      d='flex'
      flexDirection={['column', 'row', 'row']}
      fontWeight={500}
      color='gray.600'
      alignItems={['flex-start', 'center']}
      justifyContent={'space-between'}
      sx={{
        '@media (hover: none)': {
          '&:hover': {
            '& .list-item-title': {
              transform: 'none'
            }
          }
        }
      }}
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
        <Badge pos='relative' top='1px' variant='subtle' colorScheme='green' ml='10px'>{badgeText}</Badge>}
      </Flex>
      <Text d={[hideSubtitleOnMobile ? 'none' : 'inline', 'inline']} mt={['3px', 0]} as='span'
            fontSize={['11px', '11px', '12px']} color='gray.500'>{subtitle}</Text>
    </Link>
  );
}
