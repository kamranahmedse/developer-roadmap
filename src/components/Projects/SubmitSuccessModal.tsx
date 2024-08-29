import { CheckCircle, CheckCircle2, Clipboard, Copy } from 'lucide-react';
import { getUser } from '../../lib/jwt.ts';
import { Modal } from '../Modal';
import { CheckIcon as ReactCheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';
import { cn } from '../../lib/classname.ts';

type SubmitSuccessModalProps = {
  projectId: string;
  onClose: () => void;
};

export function SubmitSuccessModal(props: SubmitSuccessModalProps) {
  const { onClose, projectId } = props;

  const user = getUser();

  const projectSolutionUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/projects/${projectId}/solutions?u=${user?.id}`;

  const { isCopied, copyText } = useCopyText();

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <div className="flex flex-col items-center justify-center pb-3 pt-12">
        <ReactCheckIcon additionalClasses="h-12 text-green-500 w-12" />
        <p className="mt-4 text-lg font-medium">Solution Submitted</p>
        <p className="mt-0.5 text-center text-sm text-gray-500">
          Congrats! Your solution has been submitted.
        </p>

        <div className="mt-4 w-full">
          <input
            type="text"
            readOnly={true}
            value={projectSolutionUrl}
            className="w-full rounded-md border bg-gray-50 px-2.5 py-2 text-sm text-gray-700 focus:outline-none"
            onClick={(e) => {
              e.currentTarget.select();
            }}
          />

          <button
            className={cn(
              'mt-2 flex w-full items-center justify-center gap-1 rounded-md px-2 py-2 text-sm font-medium transition-colors',
              isCopied
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-black text-white hover:bg-gray-800'
            )}
            onClick={() => {
              copyText(projectSolutionUrl);
            }}
          >
            {isCopied ? (
              <>
                <CheckCircle className="size-4 stroke-[2.5px]" />
                URL Copied
              </>
            ) : (
              <>
                <Copy className="size-4 stroke-[2.5px]" />
                Copy Shareable Link
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
