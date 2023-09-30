import { CheckCircle, Copy } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';

type CopyRoadmapLinkProps = {
  roadmapId: string;
  onClose: () => void;
};

export function CopyRoadmapLink(props: CopyRoadmapLinkProps) {
  const { roadmapId, onClose } = props;

  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  const shareLink = `${baseUrl}/r?id=${roadmapId}`;

  const { copyText, isCopied } = useCopyText();

  return (
    <div className="flex grow flex-col justify-center">
      <div className="mt-5 flex grow flex-col items-center justify-center gap-1.5">
        <CheckCircle className="h-14 w-14 text-green-500" />
        <h3 className="text-xl font-medium">Sharing Settings Updated</h3>
      </div>

      <input
        type="text"
        className="mt-6 w-full rounded-md border bg-gray-50 p-2 px-2.5 text-gray-700 focus:outline-none"
        value={shareLink}
        readOnly
        onClick={(e) => {
          e.currentTarget.select();
          copyText(shareLink);
        }}
      />
      <p className="mt-1 text-sm text-gray-400">
        You can share the above link with anyone who has access
      </p>

      <div className="mt-4 flex flex-col items-center justify-end gap-2">
        <button
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded bg-black px-4 py-2.5 text-sm font-medium text-white hover:opacity-80',
            isCopied && 'bg-green-300 text-green-800'
          )}
          disabled={isCopied}
          onClick={() => {
            copyText(shareLink);
          }}
        >
          <Copy className="h-3.5 w-3.5 stroke-[2.5]" />
          {isCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100'
          )}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
