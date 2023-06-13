import { useState } from 'preact/hooks';

import { useCopyText } from '../../hooks/use-copy-text';
import { useAuth } from '../../hooks/use-auth';
import { TallBadgeTab } from './TallBadgeTab';
import WideBadgeTab from './WideBadgeTab';
import CopyIcon from '../../icons/copy.svg';

export type GetBadgeLinkProps = {
  user: ReturnType<typeof useAuth>;
  variant: 'dark' | 'light';
  badge: 'tall' | 'wide';
};

export function getBadgeLink({ user, variant, badge }: GetBadgeLinkProps) {
  const badgeUrl = `${import.meta.env.PUBLIC_API_URL}/v1-badge/${badge}/${
    user?.id
  }${variant ? `?variant=${variant}` : ''}`;
  const textareaContent = `
  <a href="${badgeUrl}">
    <img src="${badgeUrl}" alt="${user?.name}${user?.name && "'s"} Road Card"/>
  </a>
      `.trim();
  const markdownSnippet = `
      [![${user?.name}${
    user?.name && "'s"
  } Road Card](${badgeUrl})](${badgeUrl})
          `.trim();

  return {
    badgeUrl,
    textareaContent,
    markdownSnippet,
  };
}

type EditorProps = {
  title: string;
  text: string;
};

export function Editor(props: EditorProps) {
  const { text, title } = props;

  const { isCopied, copyText } = useCopyText();

  return (
    <div className="flex flex-grow flex-col overflow-hidden rounded border border-gray-300 bg-gray-50 w-full">
      <div className="flex items-center justify-between gap-2 border-b border-gray-300 px-3 py-2">
        <span className="text-xs uppercase leading-none text-gray-400">
          {title}
        </span>
        <button className="flex items-center" onClick={() => copyText(text)}>
          {isCopied && (
            <span className="mr-1 text-xs leading-none text-green-500">
              Copied!
            </span>
          )}

          <img src={CopyIcon} alt="Copy" className="inline-block h-4 w-4" />
        </button>
      </div>
      <textarea
        className="no-scrollbar block h-12 w-full overflow-x-auto whitespace-nowrap bg-gray-200/70 p-3 text-sm text-gray-900"
        readOnly
      >
        {text}
      </textarea>
    </div>
  );
}

export type BadgeProps = {
  badgeUrl: string;
};

export function RoadCardPage() {
  const [selectedBadge, setSelectedBadge] = useState<'tall' | 'wide'>('tall');

  const user = useAuth();
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">Road Card</h2>
        <p className="mt-2 text-gray-400">
          Grab your #RoadCard and share your progress with others.
        </p>
      </div>

      <div>
        <div className="mb-6 flex items-center border-b">
          <div className="flex items-center">
            <button
              className={`relative top-px flex items-center justify-center px-3 pb-3 leading-none shadow-gray-600 ${
                selectedBadge === 'tall'
                  ? 'shadow-[inset_0_-1px_0_var(--tw-shadow-color)]'
                  : 'text-gray-600'
              }`}
              onClick={() => {
                setSelectedBadge('tall');
              }}
            >
              Tall
            </button>

            <button
              className={`relative top-px flex items-center justify-center px-3 pb-3 leading-none shadow-gray-600 ${
                selectedBadge === 'wide'
                  ? 'shadow-[inset_0_-1px_0_var(--tw-shadow-color)]'
                  : 'text-gray-600'
              }`}
              onClick={() => {
                setSelectedBadge('wide');
              }}
            >
              Wide
            </button>
          </div>
        </div>
      </div>

      {selectedBadge === 'tall' && <TallBadgeTab />}
      {selectedBadge === 'wide' && <WideBadgeTab />}
    </>
  );
}
