import React from 'react';
import { BannerWrap, CloseSponsor, EmojiWrap, SponsorLogo } from './style';

export function SponsorBanner({ onCloseBanner = () => null }){
  return (
    <div className='row'>
      <div className='col p-0'>
        <BannerWrap
            href={`https://try.digitalocean.com/developer-cloud/?utm_source=roadmapsh&utm_medium=partnerships`}
            target='_blank'
            className='alert alert-info'
        >
            <SponsorLogo src='/sponsors/do.svg' />
            Sponsored by DigitalOcean
            <EmojiWrap src={'/sponsors/heart-eyes.svg'} />
            <span className='d-none d-md-inline-block'>Check them out!</span>

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