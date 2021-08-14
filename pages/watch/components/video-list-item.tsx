import { Badge, Flex, Link, Text } from '@chakra-ui/react';
import { VideoIcon } from '../../../icons/video-icon';

type VideoListItemProps = {
  title: string;
  duration: string;
  isPro?: boolean;
};

export function VideoListItem(props: VideoListItemProps) {
  const { title, duration, isPro = false } = props;

  return (
    <Link
      fontSize='15px'
      p='10px'
      d='flex'
      fontWeight={500}
      color='gray.600'
      alignItems='center'
      justifyContent={'space-between'}
      _hover={{
        textDecoration: 'none',
        color: 'blue.400',
        '& .video-title': {
          transform: 'translateX(10px)'
        }
      }}
    >
      <Flex alignItems='center' className='video-title' transition={'200ms'}>
        <VideoIcon style={{ width: '18px', height: '18px', color: '#9c9c9c' }} />
        <Text as='span' ml='7px'>{title}</Text>
        {isPro && <Badge variant='subtle' colorScheme='purple' ml='10px'>Pro</Badge>}
      </Flex>
      <Text as='span' fontWeight={500} color='gray.400' fontSize='12px' ml='10px'>{duration}</Text>
    </Link>
  );
}
