import { ArrowUpRight, X } from 'lucide-react';
import { Modal } from '../Modal';
import { SubmissionRequirement } from './SubmissionRequirement.tsx';

type LeavingRoadmapWarningModalProps = {
  onClose: () => void;
  repositoryUrl: string;
};

export function LeavingRoadmapWarningModal(
  props: LeavingRoadmapWarningModalProps,
) {
  const { onClose, repositoryUrl } = props;

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-1.5 text-2xl font-semibold">Leaving roadmap.sh</h2>
      <p className="text-sm text-gray-500">
        You are about to visit the project solution on GitHub. We recommend you
        to follow these tips before you leave.
      </p>

      <div className="my-3">
        <p className="rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          Make sure to come back and{' '}
          <span className="font-medium text-purple-600">leave an upvote</span>{' '}
          if you liked the solution. It helps the author and the community.
        </p>

        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          If you have feedback on the solution, open an issue or a pull request
          on the{' '}
          <span className="font-medium text-purple-600">
            solution repository
          </span>
          .
        </p>

        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          Downvote the solution if it is{' '}
          <span className="font-medium text-purple-600">
            incorrect or misleading
          </span>
          . It helps the community.
        </p>
      </div>

      <a
        className="inline-flex w-full items-center gap-2 rounded-lg bg-black px-3 py-2.5 text-sm text-white"
        href={repositoryUrl}
        target="_blank"
      >
        <ArrowUpRight className="h-5 w-5" />
        Continue to Solution
      </a>
    </Modal>
  );
}
