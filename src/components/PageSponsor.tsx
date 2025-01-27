import { useEffect, useState } from 'react';
import { httpGet, httpPatch, httpPost } from '../lib/http';
import { sponsorHidden } from '../stores/page';
import { useStore } from '@nanostores/react';
import { X } from 'lucide-react';
import { setViewSponsorCookie } from '../lib/jwt';
import { isMobile } from '../lib/is-mobile';
import Cookies from 'js-cookie';
import { getUrlUtmParams } from '../lib/browser.ts';

export type PageSponsorType = {
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
  sponsor?: PageSponsorType;
};

type PageSponsorProps = {
  gaPageIdentifier?: string;
};

const CLOSE_SPONSOR_KEY = 'sponsorClosed';

function markSponsorHidden(sponsorId: string) {
  Cookies.set(`${CLOSE_SPONSOR_KEY}-${sponsorId}`, '1', {
    path: '/',
    expires: 1,
    sameSite: 'lax',
    secure: true,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

function isSponsorMarkedHidden(sponsorId: string) {
  return Cookies.get(`${CLOSE_SPONSOR_KEY}-${sponsorId}`) === '1';
}

export function PageSponsor(props: PageSponsorProps) {
  const { gaPageIdentifier } = props;
  const $isSponsorHidden = useStore(sponsorHidden);

  const [sponsorId, setSponsorId] = useState<string | null>(null);
  const [sponsor, setSponsor] = useState<PageSponsorType>();

  useEffect(() => {
    const foundUtmParams = getUrlUtmParams();

    if (!foundUtmParams.utmSource) {
      return;
    }

    localStorage.setItem('utm_params', JSON.stringify(foundUtmParams));
  }, []);

  const loadSponsor = async () => {
    const currentPath = window.location.pathname;
    if (
      currentPath === '/' ||
      currentPath === '/best-practices' ||
      currentPath === '/roadmaps' ||
      currentPath.startsWith('/guides') ||
      currentPath.startsWith('/videos') ||
      currentPath.startsWith('/account') ||
      currentPath.startsWith('/team/')
    ) {
      return;
    }

    const { response, error } = await httpGet<V1GetSponsorResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-sponsor`,
      {
        href: window.location.pathname,
        mobile: isMobile() ? 'true' : 'false',
      },
    );

    if (error) {
      console.error(error);
      return;
    }

    if (
      !response?.sponsor ||
      !response.id ||
      isSponsorMarkedHidden(response.id)
    ) {
      return;
    }

    setSponsor(response.sponsor);
    setSponsorId(response.id);

    window.fireEvent({
      category: 'SponsorImpression',
      action: `${response.sponsor?.company} Impression`,
      label:
        response.sponsor.gaLabel ||
        `${gaPageIdentifier} / ${response.sponsor?.company} Link`,
    });
  };

  const clickSponsor = async (sponsorId: string) => {
    const clickUrl = new URL(
      `${import.meta.env.PUBLIC_API_URL}/v1-view-sponsor/${sponsorId}`,
    );

    const { response, error } = await httpPatch<{ status: 'ok' }>(
      clickUrl.toString(),
      {
        mobile: isMobile(),
      },
    );

    if (error || !response) {
      console.error(error);
      return;
    }

    setViewSponsorCookie(sponsorId);
  };

  useEffect(() => {
    window.setTimeout(loadSponsor);
  }, []);

  if ($isSponsorHidden || !sponsor) {
    return null;
  }

  const { url, title, imageUrl, description, company, gaLabel } = sponsor;

  const isRoadmapAd = title.toLowerCase() === 'advertise with us!';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener sponsored nofollow"
      className="fixed bottom-0 left-0 right-0 z-50 flex bg-white shadow-lg outline-0 outline-transparent sm:bottom-[15px] sm:left-auto sm:right-[15px] sm:max-w-[350px]"
      onClick={async () => {
        const labelValue = gaLabel || `${gaPageIdentifier} / ${company} Link`;

        window.fireEvent({
          category: 'SponsorClick',
          action: `${company} Redirect`,
          label: labelValue,
          value: labelValue,
        });
        await clickSponsor(sponsorId || '');
      }}
    >
      <span
        className="absolute right-1 top-1 text-gray-400 hover:text-gray-800 sm:right-1.5 sm:top-1.5 sm:text-gray-300"
        aria-label="Close"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          markSponsorHidden(sponsorId || '');
          sponsorHidden.set(true);
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
