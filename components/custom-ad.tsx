export const CustomAd = () => {
  return (
    <div id='sponsorads'>
      <span>
        <span className='sponsor-wrap'>
          <a
            href='https://freemote.com/strategy?sl=roadmap'
            className='sponsor-img'
            target='_blank'
          >
            <img
              src='/fm-img.png'
              alt='FM Logo'
              width='112'
              style={{ maxWidth: '112px', border: 'none' }}
            />
          </a>
          <a
            href='https://freemote.com/strategy?sl=roadmap'
            className='sponsor-text'
            target='_blank'
          >
            He Went from ZERO TO $74,000 as a Full Time Developer in 7 Weeks
          </a>
        </span>
        <a
          href='https://github.com/sponsors/kamranahmedse'
          className='sponsor-poweredby'
          target='_blank'
        >
          Sponsored by
        </a>
      </span>
    </div>
  );
};
