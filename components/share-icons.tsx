import { Box, Flex, Link } from '@chakra-ui/react';
import HackerNewsIcon from 'components/icons/hackernews-square.svg';
import FacebookIcon from 'components/icons/facebook-square.svg';
import TwitterIcon from 'components/icons/twitter-square.svg';
import RedditIcon from 'components/icons/reddit-square.svg';
import { Icon } from '@chakra-ui/icons';
import { getFacebookShareUrl, getHnShareUrl, getRedditShareUrl, getTwitterShareUrl } from '../lib/url';
import { useEffect, useState } from 'react';

type ShareIconProps = {
  text: string;
  url: string;
}

export function ShareIcons(props: ShareIconProps) {
  const { text, url } = props;

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (offset <= 100) {
    return null;
  }

  return (
    <Box pos='absolute' left={'-15px'} top={'190px'} height='100%' display={['none', 'none', 'none', 'block']}>
      <Flex pos='sticky' top='100px' flexDir='column'>
        <Link target='_blank' color='gray.500' href={getTwitterShareUrl({ url, text })} _hover={{ color: "gray.700" }}><Icon fill='currentColor' height='24px' width='24px' as={TwitterIcon} /></Link>
        <Link target='_blank' color='gray.500' href={getFacebookShareUrl({ url, text })} _hover={{ color: "gray.700" }}><Icon fill='currentColor' height='24px' width='24px' as={FacebookIcon} /></Link>
        <Link target='_blank' color='gray.500' href={getHnShareUrl({ url, text })} _hover={{ color: "gray.700" }}><Icon fill='currentColor' height='24px' width='24px' as={HackerNewsIcon} /></Link>
        <Link target='_blank' color='gray.500' href={getRedditShareUrl({ text, url })} _hover={{ color: "gray.700" }}><Icon fill='currentColor' height='24px' width='24px' as={RedditIcon} /></Link>
      </Flex>
    </Box>
  );
}
