import { Check, Code2, Copy, Facebook, Linkedin, Share2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click.ts';
import { useCopyText } from '../hooks/use-copy-text.ts';
import { cn } from '../lib/classname.ts';
import { TwitterIcon } from './ReactIcons/TwitterIcon.tsx';
import { EmbedRoadmapModal } from './CustomRoadmap/EmbedRoadmapModal.tsx';

type ShareRoadmapButtonProps = {
  roadmapId?: string;
  description: string;
  pageUrl: string;
  allowEmbed?: boolean;
};

export function ShareRoadmapButton(props: ShareRoadmapButtonProps) {
  const { description, pageUrl, allowEmbed = false, roadmapId } = props;

  const { isCopied, copyText } = useCopyText();

  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${description}&url=${pageUrl}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${description}&u=${pageUrl}`;
  const hnUrl = `https://news.ycombinator.com/submitlink?t=${description}&u=${pageUrl}`;
  const redditUrl = `https://www.reddit.com/submit?title=${description}&url=${pageUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${description}`;

  useOutsideClick(containerRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      {isEmbedModalOpen && (
        <EmbedRoadmapModal
          onClose={() => {
            setIsEmbedModalOpen(false);
          }}
        />
      )}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'inline-flex h-full items-center justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium hover:bg-yellow-500 sm:text-sm',
          {
            'bg-yellow-500': isDropdownOpen,
            'bg-green-400': isCopied,
          },
        )}
        aria-label="Share Roadmap"
      >
        {!isCopied && (
          <>
            <Share2 size="15px" />
            <span className="ml-2 hidden sm:inline">Share</span>
          </>
        )}
        {isCopied && (
          <>
            <Check size="15px" />
            <span className="ml-2 hidden sm:inline">Copied</span>
          </>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-[999] mt-1 w-40 rounded-md bg-slate-800 text-sm text-white shadow-lg ring-1 ring-black ring-opacity-5 w-[175px]">
          <div className="flex flex-col px-1 py-1">
            <button
              onClick={() => {
                copyText(pageUrl);
                setIsDropdownOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] items-center justify-center">
                <Copy size="15px" className="text-slate-400" />
              </div>
              Copy Link
            </button>
            {allowEmbed && roadmapId && (
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsEmbedModalOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
              >
                <div className="flex w-[20px] items-center justify-center">
                  <Code2 size="15px" className="text-slate-400" />
                </div>
                Embed Roadmap
              </button>
            )}
            <a
              href={twitterUrl}
              target={'_blank'}
              className="mt-1 flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] flex-shrink-0 items-center justify-center">
                <TwitterIcon className="h-[16px] text-slate-400" />
              </div>
              Twitter
            </a>
            <a
              href={fbUrl}
              target={'_blank'}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] items-center justify-center">
                <Facebook size="16px" className="text-slate-400" />
              </div>
              Facebook
            </a>
            <a
              href={hnUrl}
              target={'_blank'}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] items-center justify-center">
                <img
                  alt={'hackernews logo'}
                  src={'/images/hackernews.svg'}
                  className="h-5 w-5"
                />
              </div>
              Hacker News
            </a>
            <a
              href={redditUrl}
              target={'_blank'}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] items-center justify-center">
                <img
                  alt={'reddit logo'}
                  src={'/images/reddit.svg'}
                  className="h-5 w-5"
                />
              </div>
              Reddit
            </a>
            <a
              href={linkedinUrl}
              target={'_blank'}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-slate-100 hover:bg-slate-700"
            >
              <div className="flex w-[20px] items-center justify-center">
                <Linkedin size="16px" className="text-slate-400" />
              </div>
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
