import { useEffect, useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME, decodeToken } from '../../lib/jwt';
import { WideBadge } from './WideBadge';
import { LongBadge } from './LongBadge';

import CopyIcon from '../../icons/copy.svg';

export type BadgeProps = {
  badgeUrl: string;
};

export function RoadCardPage() {
  const [selectedBadge, setSelectedBadge] = useState<'long' | 'wide'>('long');
  const [isCopied, setIsCopied] = useState(false);
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  const user = decodeToken(token);

  const badgeUrl = `${
    import.meta.env.PUBLIC_API_URL
  }/v1-badge/${selectedBadge}/${user.id}`;

  const textareaContent = `
  <a
  href="${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="${import.meta.env.PUBLIC_API_URL}/v1-badge/long/${user.id}"
    alt="Road Card"
  />
</a>
  `.trim();

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(textareaContent);
    setIsCopied(true);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <>
      <div className="mb-8">
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
              onClick={() => setSelectedBadge('long')}
            >
              Long
            </button>

            <button
              className={`relative top-px flex items-center justify-center px-3 py-2 leading-none shadow-gray-600 ${
                selectedBadge === 'wide'
                  ? 'shadow-[inset_0_-1px_0_var(--tw-shadow-color)]'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedBadge('wide')}
            >
              Wide
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${selectedBadge === 'long' && 'grid grid-cols-5 gap-6'} ${
          selectedBadge === 'wide' && 'flex flex-col gap-6'
        }`}
      >
        {selectedBadge === 'long' && <LongBadge badgeUrl={badgeUrl} />}

        {selectedBadge === 'wide' && <WideBadge badgeUrl={badgeUrl} />}

        <div className={`${selectedBadge === 'long' && 'col-span-3'}`}>
          <div className="flex items-center gap-2 text-xs uppercase text-gray-400 leading-none">
            Embed
            <button
              className="flex items-center"
              onClick={handleCopyEmbed}
            >
              <img src={CopyIcon} alt="Copy" className="inline-block h-4 w-4" />
              {isCopied && <span className="ml-2 text-green-500">Copied!</span>}
            </button>
          </div>
          <textarea
            className="no-scrollbar mt-3 h-32 w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900"
            readOnly
          >
            {textareaContent}
          </textarea>
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
