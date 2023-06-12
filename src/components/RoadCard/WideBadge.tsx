import { useIsCopied } from '../../hooks/use-is-copied';
import type { BadgeProps } from './RoadCardPage';

export function WideBadge({ badgeUrl }: BadgeProps) {
  const { isCopied, handleCopy } = useIsCopied();
  return (
    <div>
      <a
        href={badgeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[2.63/1] w-full hover:cursor-pointer"
      >
        <img
          src={badgeUrl}
          alt="Road Card"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </a>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75"
          href={badgeUrl + '?type=png'}
          download
        >
          Download
        </a>
        <a
          className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-xs font-medium leading-none hover:opacity-75"
          onClick={() => handleCopy(badgeUrl)}
        >
          {isCopied ? 'Copied!' : 'Copy Link'}
        </a>
      </div>
    </div>
  );
}
