import { Badge, Flex, Link, Text } from '@chakra-ui/react';

type GuideListItemProps = {
  title: string;
  date: string;
  isPro?: boolean;
};

export function GuideListItem(props: GuideListItemProps) {
  const { title, date, isPro = false } = props;

  return (
    <Link
      fontSize='15px'
      px='0'
      py='8px'
      d='flex'
      fontWeight={500}
      color='gray.600'
      alignItems='center'
      justifyContent={'space-between'}
      _hover={{
        textDecoration: 'none',
        color: 'blue.400',
        '& .guide-title': {
          transform: 'translateX(10px)'
        }
      }}
    >

      <Flex alignItems='center' className='guide-title' transition={'200ms'}>
        <Text as='span' ml='7px'>{title}</Text>
        {isPro && <Badge variant='subtle' colorScheme='purple' ml='10px'>Pro</Badge>}
      </Flex>
      <Text fontSize='13px' color='gray.500' as='span'>{date}</Text>
    </Link>
  );
}
