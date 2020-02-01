import React from 'react';
import { BannerWrap, CloseSponsor, EmojiWrap } from './style';

export function SponsorBanner({ onCloseBanner = () => null }){
  return (
    <div className='row'>
      <div className='col p-0'>
        <BannerWrap href='https://google.com' target='_blank' className='alert alert-info'>
            Sponsored by DigitalOcean
            <EmojiWrap>😍</EmojiWrap>
            Check them out!

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