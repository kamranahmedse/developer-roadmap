import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useCopyText } from '../../hooks/use-copy-text';
import { CopyIcon } from 'lucide-react';

type InviteFriendPopupProps = {
  befriendUrl: string;
  onClose: () => void;
};

export function InviteFriendPopup(props: InviteFriendPopupProps) {
  const { onClose, befriendUrl } = props;

  const { isCopied, copyText } = useCopyText();

  const popupBodyRef = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    onClose();
  };

  useOutsideClick(popupBodyRef, handleClosePopup);

  return (
    <div className="popup fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyRef}
          className="popup-body relative rounded-lg bg-white p-4 shadow-sm"
        >
          <h3 className="mb-1.5 text-xl font-medium sm:text-2xl">Invite URL</h3>
          <p className="mb-3 hidden text-sm leading-none text-gray-400 sm:block">
            Share the link below with your friends to invite them.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:mt-4">
            <input
              readOnly={true}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:border-gray-400"
              value={befriendUrl}
              onClick={(e: MouseEvent<HTMLInputElement>) => {
                (e?.target as HTMLInputElement)?.select();
                copyText(befriendUrl);
              }}
            />
            <button
              className={`flex items-center justify-center gap-1 rounded-md border-0 px-3 py-2.5 text-sm text-black ${
                isCopied
                  ? 'bg-green-300 hover:bg-green-300'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => {
                copyText(befriendUrl);
              }}
            >
              <CopyIcon className="mr-1 h-4 w-4" />
              {isCopied ? 'Copied' : 'Copy URL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
