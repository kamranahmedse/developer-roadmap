import { useEffect, useState } from 'react';
import { httpGet, httpPatch, httpPost } from '../../lib/http';
import { sponsorHidden } from '../../stores/page';
import { useStore } from '@nanostores/react';
import { X } from 'lucide-react';
import { setViewSponsorCookie } from '../../lib/jwt';
import { isMobile } from '../../lib/is-mobile';
import Cookies from 'js-cookie';
import { getUrlUtmParams } from '../../lib/browser.ts';

export type BottomRightSponsorType = {
  id: string;
  company: string;
  description: string;
  gaLabel: string;
  imageUrl: string;
  pageUrl: string;
  title: string;
  url: string;
};

type V1GetSponsorResponse = {
  id?: string;
  href?: string;
  sponsor?: BottomRightSponsorType;
};

type BottomRightSponsorProps = {
  sponsor: BottomRightSponsorType;

  onSponsorClick: () => void;
  onSponsorImpression: () => void;
  onSponsorHidden: () => void;
};

export function BottomRightSponsor(props: BottomRightSponsorProps) {
  const { sponsor, onSponsorImpression, onSponsorClick, onSponsorHidden } =
    props;

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!sponsor) {
      return;
    }

    onSponsorImpression();
  }, []);

  const { url, title, imageUrl, description, company, gaLabel } = sponsor;

  const isRoadmapAd = title.toLowerCase() === 'advertise with us!';

  if (isHidden) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener sponsored nofollow"
      className="fixed bottom-0 left-0 right-0 z-50 flex bg-white shadow-lg outline-0 outline-transparent sm:bottom-[15px] sm:left-auto sm:right-[15px] sm:max-w-[350px]"
      onClick={onSponsorClick}
    >
      <span
        className="absolute right-1 top-1 text-gray-400 hover:text-gray-800 sm:right-1.5 sm:top-1.5 sm:text-gray-300"
        aria-label="Close"
        onClick={(e) => {
          e.preventDefault();
          setIsHidden(true);
          onSponsorHidden();
        }}
      >
        <X className="h-5 w-5 sm:h-4 sm:w-4" />
      </span>
      <span>
        <img
          src={imageUrl}
          className="block h-[106px] object-cover sm:h-[153px] sm:w-[118.18px]"
          alt="Sponsor Banner"
        />
      </span>
      <span className="flex flex-1 flex-col justify-between text-xs sm:text-sm">
        <span className="p-[10px]">
          <span className="mb-0.5 block font-semibold">{title}</span>
          <span className="block text-gray-500">{description}</span>
        </span>
        {!isRoadmapAd && (
          <>
            <span className="sponsor-footer hidden sm:block">
              Partner Content
            </span>
            <span className="block pb-1 text-center text-[10px] uppercase text-gray-400 sm:hidden">
              Partner Content
            </span>
          </>
        )}
      </span>
    </a>
  );
}
