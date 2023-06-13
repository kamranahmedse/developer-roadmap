import { useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME, decodeToken } from '../../lib/jwt';
import { WideBadge } from './WideBadge';
import { LongBadge } from './LongBadge';

import CopyIcon from '../../icons/copy.svg';
import { useIsCopied } from '../../hooks/use-is-copied';

export type BadgeProps = {
  badgeUrl: string;
};

export function RoadCardPage() {
  const [selectedBadge, setSelectedBadge] = useState<'long' | 'wide'>('long');
  const [selectedVariant, setSelectedVariant] = useState<'dark' | 'light'>(
    'dark'
  );
  const { isCopied, handleCopy } = useIsCopied();
  const { isCopied: isMarkdownCopied, handleCopy: handleMarkdownCopy } =
    useIsCopied();

  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  const user = decodeToken(token);

  const badgeUrl = `${
    import.meta.env.PUBLIC_API_URL
  }/v1-badge/${selectedBadge}/${user.id}?variant=${selectedVariant}`;

  const textareaContent = `
  <a href="${badgeUrl}"><img src="${badgeUrl}" alt="${user?.name}${
    user?.name && "'s"
  } Road Card"/></a>
    `.trim();

  const markdownSnippet = `
[![${user?.name}${user?.name && "'s"} Road Card](${badgeUrl})](${badgeUrl})
    `.trim();

  return (
    <>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">Grab your #RoadCard</h2>
        <p className="mt-2">
          Pick a badge and share your progress with the world.
        </p>
      </div>

      <div>
        <div className="mb-10 flex items-center border-b">
          <div className="flex items-center">
            <button
              className={`relative top-px flex items-center justify-center px-3 py-2 leading-none shadow-gray-600 ${
                selectedBadge === 'long'
                  ? 'shadow-[inset_0_-1px_0_var(--tw-shadow-color)]'
                  : 'text-gray-600'
              }`}
              onClick={() => {
                setSelectedBadge('long');
                setSelectedVariant('dark');
              }}
            >
              Long
            </button>

            <button
              className={`relative top-px flex items-center justify-center px-3 py-2 leading-none shadow-gray-600 ${
                selectedBadge === 'wide'
                  ? 'shadow-[inset_0_-1px_0_var(--tw-shadow-color)]'
                  : 'text-gray-600'
              }`}
              onClick={() => {
                setSelectedBadge('wide');
                setSelectedVariant('dark');
              }}
            >
              Wide
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          selectedBadge === 'long' && 'grid gap-6 sm:grid-cols-5'
        } ${selectedBadge === 'wide' && 'flex flex-col gap-6'}`}
      >
        {selectedBadge === 'long' && <LongBadge badgeUrl={badgeUrl} />}

        {selectedBadge === 'wide' && <WideBadge badgeUrl={badgeUrl} />}

        <div className={`${selectedBadge === 'long' && 'sm:col-span-3'}`}>
          <div>
            <span className="text-xs uppercase leading-none text-gray-400">
              Variation
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

          <div
            className={`${
              selectedBadge === 'wide' && 'grid grid-cols-2 gap-4'
            }`}
          >
            <div className="mt-6 overflow-hidden rounded border border-gray-300 bg-gray-50">
              <div className="flex items-center justify-between gap-2 border-b border-gray-300 p-3">
                <span className="text-xs uppercase leading-none text-gray-400">
                  Markdown
                </span>
                <button
                  className="flex items-center"
                  onClick={() => handleMarkdownCopy(markdownSnippet)}
                >
                  {isMarkdownCopied && (
                    <span className="mr-2 text-xs leading-none text-green-500">
                      Copied!
                    </span>
                  )}
                  <img
                    src={CopyIcon}
                    alt="Copy"
                    className="inline-block h-4 w-4"
                  />
                </button>
              </div>
              <textarea
                className="no-scrollbar block h-12 w-full overflow-x-auto whitespace-nowrap bg-gray-200/70 p-3 text-gray-900"
                readOnly
              >
                {markdownSnippet}
              </textarea>
            </div>
            <div className="mt-6 overflow-hidden rounded border border-gray-300 bg-gray-50">
              <div className="flex items-center justify-between gap-2 border-b border-gray-300 p-3">
                <span className="text-xs uppercase leading-none text-gray-400">
                  Embed
                </span>
                <button
                  className="flex items-center"
                  onClick={() => handleCopy(textareaContent)}
                >
                  {isCopied && (
                    <span className="mr-2 text-xs leading-none text-green-500">
                      Copied!
                    </span>
                  )}
                  <img
                    src={CopyIcon}
                    alt="Copy"
                    className="inline-block h-4 w-4"
                  />
                </button>
              </div>
              <textarea
                className="no-scrollbar block h-12 w-full overflow-x-auto whitespace-nowrap bg-gray-200/70 p-3 text-gray-900"
                readOnly
              >
                {textareaContent}
              </textarea>
            </div>
          </div>

          <p className="mt-3">
            You can include it on your website or follow the instructions to{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:no-underline"
            >
              include it on your GitHub profile.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
