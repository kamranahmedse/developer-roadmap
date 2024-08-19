import { useState } from 'react';
import { Modal } from './Modal.tsx';
import { PartyPopper } from 'lucide-react';
import { isMobileScreen } from '../lib/is-mobile.ts';

type FeatureAnnouncementProps = {};

export function FeatureAnnouncement(props: FeatureAnnouncementProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoModal = (
    <Modal
      onClose={() => setIsPlaying(false)}
      bodyClassName={'h-auto overflow-hidden'}
      wrapperClassName={'md:max-w-3xl lg:max-w-4xl xl:max-w-5xl'}
    >
      <div className="text-balance bg-gradient-to-r from-gray-100 px-4 py-2 text-left text-sm md:py-3 lg:text-base">
        <span
          className="relative -top-px mr-1.5 rounded bg-blue-300 px-1.5 py-0.5 text-xs font-semibold uppercase text-gray-800"
          style={{ lineHeight: '1.5' }}
        >
          New
        </span>
        Projects are live on the{' '}
        <a
          href={'/backend/projects'}
          className="font-medium text-blue-500 underline underline-offset-2"
        >
          backend roadmap
        </a>
        <span className={'hidden md:inline'}>
          {' '}
          and are coming soon on the others{' '}
        </span>
        <PartyPopper className="relative -top-[3px] ml-2 inline-block h-5 w-5 text-blue-500 md:ml-1 md:h-6 md:w-6" />
      </div>
      <div
        className="iframe-container"
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          width: '300%',
          left: '-100%',
        }}
      >
        {/*https://www.youtube.com/embed/?playsinline=1&disablekb=1&&iv_load_policy=3&cc_load_policy=0&controls=0&rel=0&autoplay=1&mute=1&origin=https%3A%2F%2Fytch.xyz&widgetid=1*/}
        <iframe
          src="https://www.youtube.com/embed/9lS3slfJ0x0?start=31&autoplay=1&disablekb=1&rel=0&cc_load_policy=0&controls=0&rel=0&autoplay=1&origin=https%3A%2F%2Froadmap.sh&widgetid=1&showinfo=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </Modal>
  );

  return (
    <>
      {isPlaying && videoModal}
      <button
        className="rounded-md border border-dashed border-purple-600 px-3 py-1.5 text-purple-400 transition-colors hover:border-purple-400 hover:text-purple-200"
        onClick={() => {
          if (isMobileScreen()) {
            window.open(
              'https://www.youtube.com/watch?v=9lS3slfJ0x0',
              '_blank',
            );
            return;
          }

          setIsPlaying(true);
        }}
      >
        <span className="relative -top-[1px] mr-1 text-xs font-semibold uppercase text-white">
          New
        </span>{' '}
        <span className={'hidden sm:inline'}>
          Practice your skills with projects
        </span>
        <span className={'inline text-sm sm:hidden'}>
          Build projects to skill up
        </span>
      </button>
    </>
  );
}
