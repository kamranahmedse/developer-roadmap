import { Box, Link, Text } from '@chakra-ui/react';

type DimmedMoreProps = {
  text: string;
  href: string;
};

export function DimmedMore(props: DimmedMoreProps) {
  const { text, href } = props;

  return (
    <Box position='relative' textAlign='center' bottom='20px'>
      <Box
        opacity={1}
        pointerEvents='none'
        position='absolute'
        bottom={0}
        height='200px'
        width='100%'
        background='linear-gradient(180deg, rgb(255 255 255 / 40%), white)'
      />

      <Link
        rounded='20px'
        display='inline'
        bg='green.600'
        color='white'
        p='7px 20px'
        href={href}
        fontWeight={800}
        fontSize='11px'
        textTransform='uppercase'
        my='25px'
        position='relative'
        _hover={{
          textDecoration: 'none',
          '& .forward-arrow': {
            transform: 'translateX(3px)'
          }
        }}>
        {text}
        <Text d='inline-block' as='span' transition='200ms' ml='4px' className='forward-arrow'>&rarr;</Text>
      </Link>
    </Box>
  );
}
