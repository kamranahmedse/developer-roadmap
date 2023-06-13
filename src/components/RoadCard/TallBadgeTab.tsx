import { useState } from 'preact/hooks';
import { LongBadge } from './TallBadge';
import { Editor } from './RoadCardPage';
import { GithubReadmeBanner } from './GithubReadmeBanner';
import { useAuth } from '../../hooks/use-auth';
import { getBadgeLink } from '../../helper/get-badge-link';
import type { RoadmapOptionProps } from './RoadmapSelect';

export function TallBadgeTab({
  selectedRoadmaps,
}: {
  selectedRoadmaps: RoadmapOptionProps[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<'dark' | 'light'>(
    'dark'
  );
  const user = useAuth();

  if (!user) {
    return null;
  }
  const { badgeUrl, textareaContent, markdownSnippet } = getBadgeLink({
    user,
    variant: selectedVariant,
    badge: 'tall',
    roadmaps: selectedRoadmaps,
  });

  return (
    <div className="sm:grid sm:grid-cols-5 sm:gap-6">
      <div className="block sm:hidden mb-6">
          <span className="text-xs uppercase leading-none text-gray-400">
            Variant
          </span>

          <div className="mt-2 flex items-center gap-2">
            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${selectedVariant === 'dark' && 'border-gray-300 bg-gray-100'
                }`}
              onClick={() => setSelectedVariant('dark')}
            >
              Dark
            </button>

            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${selectedVariant === 'light' && 'border-gray-300 bg-gray-100'
                }`}
              onClick={() => setSelectedVariant('light')}
            >
              Light
            </button>
          </div>
        </div>
      <LongBadge badgeUrl={badgeUrl} />

      <div className="mt-6 sm:col-span-3 sm:mt-0">
        <div className="hidden sm:block">
          <span className="text-xs uppercase leading-none text-gray-400">
            Variant
          </span>

          <div className="mt-2 flex items-center gap-2">
            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${selectedVariant === 'dark' && 'border-gray-300 bg-gray-100'
                }`}
              onClick={() => setSelectedVariant('dark')}
            >
              Dark
            </button>

            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${selectedVariant === 'light' && 'border-gray-300 bg-gray-100'
                }`}
              onClick={() => setSelectedVariant('light')}
            >
              Light
            </button>
          </div>
        </div>

        <div className="sm:mt-4 flex flex-col gap-3">
          <Editor title={'HTML'} text={textareaContent} />
          <Editor title={'Markdown'} text={markdownSnippet} />
        </div>

        <GithubReadmeBanner />
      </div>
    </div>
  );
}
