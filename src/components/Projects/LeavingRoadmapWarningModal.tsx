import { ArrowUpRight, X } from 'lucide-react';
import { Modal } from '../Modal';
import { getRelativeTimeString } from '../../lib/date';

type LeavingRoadmapWarningModalProps = {
  onClose: () => void;
  onContinue: () => void;
};

export function LeavingRoadmapWarningModal(
  props: LeavingRoadmapWarningModalProps,
) {
  const { onClose, onContinue } = props;

  const projectTips = [
    'Leave an upvote if you liked the project',
    'Open an issue on the GitHub repository and give the user feedback about their project',
    'Report if the solution is not relevant',
  ];

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-0.5 text-xl font-semibold">Leaving roadmap.sh</h2>
      <p className="text-balance text-sm text-gray-500">
        You are about to visit the project page on GitHub. Once you have
        reviewed the project, please back and.
      </p>

      <ul className="ml-4 mt-4 list-disc space-y-1.5 marker:text-gray-400">
        {projectTips.map((tip) => {
          return (
            <li key={tip} className="text-balance">
              {tip}
            </li>
          );
        })}
      </ul>

      <button
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black p-2 px-3 text-white"
        onClick={onContinue}
      >
        <ArrowUpRight className="h-5 w-5" />
        Continue to Solution
      </button>

      <button
        className="absolute right-2.5 top-2.5 text-gray-600 hover:text-black"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
    </Modal>
  );
}
