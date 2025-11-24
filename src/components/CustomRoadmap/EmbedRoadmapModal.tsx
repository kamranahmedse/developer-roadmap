import { useStore } from '@nanostores/react';
import { Check, Copy } from 'lucide-react';

import { Modal } from '../Modal';
import { useToast } from '../../hooks/use-toast';
import { useCopyText } from '../../hooks/use-copy-text';
import { currentRoadmap, isCurrentRoadmapPersonal } from '../../stores/roadmap';
import { cn } from '../../lib/classname.ts';

type ShareRoadmapModalProps = {
  onClose: () => void;
};

export function EmbedRoadmapModal(props: ShareRoadmapModalProps) {
  const { onClose } = props;

  const toast = useToast();
  const $currentRoadmap = useStore(currentRoadmap);
  const $isCurrentRoadmapPersonal = useStore(isCurrentRoadmapPersonal);
  const roadmapId = $currentRoadmap?._id!;

  const { copyText, isCopied } = useCopyText();

  const isDev = import.meta.env.DEV;
  const baseUrl = isDev ? 'http://localhost:3000' : 'https://roadmap.sh';

  const embedHtml = `<iframe src="${baseUrl}/r/embed?id=${roadmapId}" width="100%" height="500px" frameBorder="0"\n></iframe>`;

  return (
    <Modal onClose={onClose} wrapperClassName={'max-w-[500px]'}>
      <div className="p-4 pb-0">
        <h1 className="text-xl font-semibold leading-5 text-gray-900">
          Embed Roadmap
        </h1>
      </div>

      <div className="px-4 pt-3">
        <p className={'mb-2 text-sm text-gray-500'}>
          Copy the following HTML code and paste it into your website.
        </p>
        <input
          type="text"
          value={embedHtml}
          readOnly={true}
          onClick={(e) => {
            e.currentTarget.select();
            copyText(embedHtml);
          }}
          className="w-full resize-none rounded-md border bg-gray-50 p-2 text-sm"
        />
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-2">
        <button
          className={cn(
            'flex h-9 w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white outline-hidden',
            {
              'bg-green-500 hover:bg-green-600 focus:bg-green-600': isCopied,
              'bg-gray-900 hover:bg-gray-800 focus:bg-gray-800': !isCopied,
            },
          )}
          onClick={() => {
            copyText(embedHtml);
          }}
        >
          {isCopied ? (
            <>
              <Check size={14} className="mr-2 stroke-[2.5]" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} className="mr-2 stroke-[2.5]" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
