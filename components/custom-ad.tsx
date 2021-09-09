import { Box } from '@chakra-ui/react';

export const CustomAd = () => {
  return (
    <Box className='custom-ad' d={['none !important', 'flex !important']}>
      <span>
        <span className='carbon-wrap'>
          <a
            href='https://freemote.com/strategy?sl=roadmap'
            className='carbon-img'
            target='_blank'
          >
            <img
              src='/fm-img.png'
              alt='FM Logo'
              height='100'
              width='130'
              style={{ maxWidth: '130px', border: 'none' }}
            />
          </a>
          <a
            href='https://freemote.com/strategy?sl=roadmap'
            className='carbon-text'
            target='_blank'
          >
            He Went from ZERO TO $74,000 as a Full Time Developer in 7 Weeks
          </a>
        </span>
        <a
          href='https://github.com/sponsors/kamranahmedse'
          className='carbon-poweredby'
          target='_blank'
        >
          Sponsored by
        </a>
      </span>
    </Box>
  );
};
