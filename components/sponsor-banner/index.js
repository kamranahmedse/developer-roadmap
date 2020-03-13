import React from 'react';
import { BannerWrap, CloseSponsor, EmojiWrap, SponsorLogo } from './style';

export function SponsorBanner({ onCloseBanner = () => null }){
  return (
    <div className='row'>
      <div className='col p-0'>
        <BannerWrap
            href={`https://www.youtube.com/channel/UCA0H2KIWgWTwpTFjSxp0now/playlists`}
            target='_blank'
            className='alert alert-info'
        >
            <SponsorLogo src='/sponsors/youtube.svg' />
            We now have a youtube channel
            <EmojiWrap src={'/sponsors/heart-eyes.svg'} />
            <span className='d-none d-sm-inline-block'>Subscribe for the video content.</span>

            <CloseSponsor
              onClick={(e) => {
                e.preventDefault();
                onCloseBanner();
              }}
              className='close'>&times;</CloseSponsor>
        </BannerWrap>
      </div>
    </div>
  );
}
