import { useEffect, useState } from 'react';
import { httpGet, httpPatch } from '../../lib/http';
import { sponsorHidden } from '../../stores/page';
import { useStore } from '@nanostores/react';
import { X } from 'lucide-react';
import { setViewSponsorCookie } from '../../lib/jwt';
import { isMobile } from '../../lib/is-mobile';
import Cookies from 'js-cookie';
import { getUrlUtmParams } from '../../lib/browser.ts';
import { StickyTopSponsor } from './StickyTopSponsor.tsx';
import { BottomRightSponsor } from './BottomRightSponsor.tsx';

type PageSponsorType = {
  company: string;
  description: string;
  gaLabel: string;
  imageUrl: string;
  pageUrl: string;
  title: string;
  url: string;
  id: string;
};

export type StickyTopSponsorType = PageSponsorType & {};
export type BottomRightSponsorType = PageSponsorType;

type V1GetSponsorResponse = {
  bottomRightAd?: PageSponsorType;
  stickyTopAd?: PageSponsorType;
};

type PageSponsorsProps = {
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

export function PageSponsors(props: PageSponsorsProps) {
  const { gaPageIdentifier } = props;

  const $isSponsorHidden = useStore(sponsorHidden);

  const [stickyTopSponsor, setStickyTopSponsor] =
    useState<StickyTopSponsorType>();
  const [bottomRightSponsor, setBottomRightSponsor] =
    useState<BottomRightSponsorType>();

  useEffect(() => {
    const foundUtmParams = getUrlUtmParams();

    if (!foundUtmParams.utmSource) {
      return;
    }

    localStorage.setItem('utm_params', JSON.stringify(foundUtmParams));
  }, []);

  async function loadSponsor() {
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

    setStickyTopSponsor(response?.stickyTopAd);
    setBottomRightSponsor(response?.bottomRightAd);
  }

  async function logSponsorImpression(
    sponsor: BottomRightSponsorType | StickyTopSponsorType,
  ) {
    window.fireEvent({
      category: 'SponsorImpression',
      action: `${sponsor?.company} Impression`,
      label:
        sponsor?.gaLabel || `${gaPageIdentifier} / ${sponsor?.company} Link`,
    });
  }

  async function clickSponsor(
    sponsor: BottomRightSponsorType | StickyTopSponsorType,
  ) {
    const { id: sponsorId, company, gaLabel } = sponsor;

    const labelValue = gaLabel || `${gaPageIdentifier} / ${company} Link`;

    window.fireEvent({
      category: 'SponsorClick',
      action: `${company} Redirect`,
      label: labelValue,
      value: labelValue,
    });

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
  }

  useEffect(() => {
    window.setTimeout(loadSponsor);
  }, []);

  if ($isSponsorHidden) {
    return null;
  }

  return (
    <div>
      {stickyTopSponsor && !isSponsorMarkedHidden(stickyTopSponsor.id) && (
        <StickyTopSponsor
          sponsor={stickyTopSponsor}
          onSponsorImpression={() => {
            logSponsorImpression(stickyTopSponsor).catch(console.error);
          }}
          onSponsorClick={() => {
            clickSponsor(stickyTopSponsor).catch(console.error);
          }}
          onSponsorHidden={() => {
            markSponsorHidden(stickyTopSponsor.id);
          }}
        />
      )}
      {bottomRightSponsor && !isSponsorMarkedHidden(bottomRightSponsor.id) && (
        <BottomRightSponsor
          sponsor={bottomRightSponsor}
          onSponsorClick={() => {
            clickSponsor(bottomRightSponsor).catch(console.error);
          }}
          onSponsorHidden={() => {
            markSponsorHidden(bottomRightSponsor.id);
          }}
          onSponsorImpression={() => {
            logSponsorImpression(bottomRightSponsor).catch(console.error);
          }}
        />
      )}
    </div>
  );
}
