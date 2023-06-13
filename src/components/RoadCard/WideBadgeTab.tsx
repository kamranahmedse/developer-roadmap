import { useState } from 'preact/hooks';
import { useAuth } from '../../hooks/use-auth';
import { WideBadge } from './WideBadge';
import { Editor, getBadgeLink } from './RoadCardPage';
import { GithubReadmeBanner } from './GithubReadmeBanner';

export default function WideBadgeTab() {
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
    badge: 'wide',
  });

  return (
    <div className="flex flex-col gap-6">
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

      <WideBadge badgeUrl={badgeUrl} />

      <div>
        <div className={`flex flex-col gap-3 sm:flex-row`}>
          <Editor title={'HTML'} text={textareaContent} />
          <Editor title={'Markdown'} text={markdownSnippet} />
        </div>

        <GithubReadmeBanner />
      </div>
    </div>
  );
}
