import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import CloseIcon from '../icons/close.svg';
import { httpGet } from '../lib/http';
import { sponsorHidden } from '../stores/page';

export type PageSponsorType = {
  company: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
  title: string;
  url: string;
};

type V1GetSponsorResponse = {
  href?: string;
  sponsor?: PageSponsorType;
};

type PageSponsorProps = {
  gaPageIdentifier?: string;
};

export function PageSponsor(props: PageSponsorProps) {
  const { gaPageIdentifier } = props;
  const $isSponsorHidden = useStore(sponsorHidden);
  const [sponsor, setSponsor] = useState<PageSponsorType>();

  const loadSponsor = async () => {
    const { response, error } = await httpGet<V1GetSponsorResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-sponsor`,
      {
        href: window.location.pathname,
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    if (!response?.sponsor) {
      return;
    }

    setSponsor(response.sponsor);

    window.fireEvent({
      category: 'SponsorImpression',
      action: `${response.sponsor?.company} Impression`,
      label: `${gaPageIdentifier} / ${response.sponsor?.company} Link`,
    });
  };

  // We load the sponsor after 1 second of the page load
  useEffect(() => {
    loadSponsor();
  }, []);

  if ($isSponsorHidden || !sponsor) {
    return null;
  }

  const { url, title, imageUrl, description, company, pageUrl } = sponsor;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener sponsored nofollow"
      class="fixed bottom-[15px] right-[15px] z-50 flex max-w-[350px] bg-white shadow-lg outline-0 outline-transparent"
      onClick={() => {
        window.fireEvent({
          category: 'SponsorClick',
          action: `${company} Redirect`,
          label: `${gaPageIdentifier} / ${company} Link`,
        });
      }}
    >
      <span
        class="absolute right-1.5 top-1.5 text-gray-300 hover:text-gray-800"
        aria-label="Close"
        aria-role="button"
        close-sponsor
        onClick={(e) => {
          e.preventDefault();
          e.stopImmediatePropagation();

          sponsorHidden.set(true);
        }}
      >
        <img alt="Close" class="h-4 w-4" src={CloseIcon} />
      </span>
      <img
        src={imageUrl}
        class="block h-[150px] w-[104.89px] object-contain lg:h-[169px] lg:w-[118.18px]"
        alt="Sponsor Banner"
      />
      <span class="flex flex-1 flex-col justify-between text-sm">
        <span class="p-[10px]">
          <span class="mb-0.5 block font-semibold">{title}</span>
          <span class="block text-gray-500">{description}</span>
        </span>
        <span class="sponsor-footer">Partner Content</span>
      </span>
    </a>
  );
}
