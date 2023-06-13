import { useState } from 'preact/hooks';
import { LongBadge } from './TallBadge';
import { Editor, getBadgeLink } from './RoadCardPage';
import { GithubReadmeBanner } from './GithubReadmeBanner';
import { useAuth } from '../../hooks/use-auth';

export function TallBadgeTab() {
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
  });

  return (
    <div className="sm:grid sm:grid-cols-5 sm:gap-6">
      <LongBadge badgeUrl={badgeUrl} />

      <div className="sm:col-span-3 mt-6 sm:mt-0">
        <div>
          <span className="text-xs uppercase leading-none text-gray-400">
            Variant
          </span>

          <div className="mt-2 flex items-center gap-2">
            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${
                selectedVariant === 'dark' && 'border-gray-300 bg-gray-100'
              }`}
              onClick={() => setSelectedVariant('dark')}
            >
              Dark
            </button>

            <button
              className={`flex h-7 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm leading-none hover:opacity-80 ${
                selectedVariant === 'light' && 'border-gray-300 bg-gray-100'
              }`}
              onClick={() => setSelectedVariant('light')}
            >
              Light
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <Editor title={'HTML'} text={textareaContent} />
          <Editor title={'Markdown'} text={markdownSnippet} />
        </div>

        <GithubReadmeBanner />
      </div>
    </div>
  );
}
