import { downloadImage } from '../../helper/download-image';
import { useCopyText } from '../../hooks/use-copy-text';
import type { BadgeProps } from './RoadCardPage';

export function LongBadge({ badgeUrl }: BadgeProps) {
  const { isCopied, copyText } = useCopyText();

  return (
    <div className="col-span-2">
      <a
        href={badgeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[300/392] w-full hover:cursor-pointer"
      >
        <img
          src={badgeUrl}
          alt="Road Card"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </a>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          className="flex h-8 items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-sm font-medium leading-none hover:opacity-75"
          onClick={() =>
            downloadImage({ url: badgeUrl, name: 'road-card', scale: 4 })
          }
        >
          Download
        </button>
        <button
          className="flex h-8 cursor-pointer items-center justify-center whitespace-nowrap rounded border border-gray-300 bg-gray-50 px-2 text-sm font-medium leading-none hover:opacity-75"
          onClick={() => copyText(badgeUrl)}
        >
          {isCopied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
