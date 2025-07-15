import { useEffect, useRef } from 'react';
import { cn } from '../../lib/classname';
import { FacebookIcon } from '../ReactIcons/FacebookIcon';
import { HackerNewsIcon } from '../ReactIcons/HackerNewsIcon';
import { RedditIcon } from '../ReactIcons/RedditIcon';
import { TwitterIcon } from '../ReactIcons/TwitterIcon';

type ShareIconsProps = {
  resourceId: string;
  resourceType: string;
  pageUrl: string;
  description: string;
};

export function ShareIcons(props: ShareIconsProps) {
  const { pageUrl, description, resourceType, resourceId } = props;

  const shareIconsRef = useRef<HTMLDivElement>(null);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${description}&url=${pageUrl}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${description}&u=${pageUrl}`;
  const hnUrl = `https://news.ycombinator.com/submitlink?t=${description}&u=${pageUrl}`;
  const redditUrl = `https://www.reddit.com/submit?title=${description}&url=${pageUrl}`;

  const icons = [
    {
      url: twitterUrl,
      icon: (
        <TwitterIcon
          className="size-[24px] [&>path]:fill-[#E5E5E5]"
          boxColor="currentColor"
        />
      ),
    },
    {
      url: fbUrl,
      icon: <FacebookIcon className="size-[26px]" />,
    },
    {
      url: hnUrl,
      icon: <HackerNewsIcon className="size-[26px]" />,
    },
    {
      url: redditUrl,
      icon: <RedditIcon className="size-[26px]" />,
    },
  ];

  useEffect(() => {
    const shareIcons = shareIconsRef.current;
    if (!shareIcons) {
      return;
    }

    const onScroll = () => {
      if (window.scrollY < 100 || window.innerWidth < 1050) {
        shareIcons.classList.add('hidden');
        return null;
      }

      shareIcons.classList.remove('hidden');
    };

    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="absolute left-[-18px] top-[110px] hidden h-full"
      ref={shareIconsRef}
    >
      <div className="sticky top-[100px] flex flex-col items-center gap-1.5">
        {icons.map((icon, index) => {
          const host = new URL(icon.url).host;

          return (
            <a
              key={index}
              href={icon.url}
              target="_blank"
              className={cn(
                'text-gray-500 hover:text-gray-700',
                index === 0 && 'mt-0.5',
              )}
              onClick={() => {
                window.fireEvent({
                  category: 'RoadmapShareLink',
                  action: `Share Roadmap / ${resourceType} / ${resourceId} / ${host}`,
                  label: icon.url,
                });
              }}
            >
              {icon.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
