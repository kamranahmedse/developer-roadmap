import { CheckCircle, Copy } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';
import { cn } from '../../lib/classname';

type CopyRoadmapLinkProps = {
  roadmapId: string;
  onClose: () => void;
};

export function CopyRoadmapLink(props: CopyRoadmapLinkProps) {
  const { roadmapId, onClose } = props;

  const shareLink = `${
    import.meta.env.PUBLIC_ROADMAP_WEB_URL
  }/r?id=${roadmapId}`;
  const { copyText, isCopied } = useCopyText();

  return (
    <div className="flex grow flex-col justify-center">
      <div className="mt-2 flex grow flex-col items-center justify-center gap-1.5">
        <CheckCircle className="h-14 w-14 text-green-500" />
        <h3 className="text-xl font-medium">Share Settings Updated</h3>
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
        Anyone from the shared list can view with this link.
      </p>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          className={cn(
            'flex items-center justify-center gap-1.5 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100'
          )}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={cn(
            'flex items-center justify-center gap-1.5 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-80',
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
      </div>
    </div>
  );
}
