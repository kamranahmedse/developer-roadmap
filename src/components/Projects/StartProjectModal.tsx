import { X } from 'lucide-react';
import { Modal } from '../Modal';
import { getRelativeTimeString } from '../../lib/date';

type StartProjectModalProps = {
  onClose: () => void;
  startedAt?: Date;
};

export function StartProjectModal(props: StartProjectModalProps) {
  const { onClose, startedAt } = props;

  const projectTips = [
    'Create a repository on GitHub',
    'Develop the required functionality',
    'Add a readme and make sure to link to the project page',
    'Once you are done, make sure to come back and submit your solution to get feedback from others.',
    'Feel free to join our discord and ask for help if you get stuck.',
  ];

  const formattedStartedAt = startedAt ? getRelativeTimeString(startedAt) : '';

  return (
    <Modal onClose={onClose} bodyClassName="h-auto p-4">
      <h2 className="mb-0.5 text-xl font-semibold">
        Started working...
        {formattedStartedAt ? (
          <span className="ml-1 rounded-md border border-yellow-400 bg-yellow-200 px-1 py-0.5 text-sm font-normal leading-none text-yellow-800">
            {formattedStartedAt}
          </span>
        ) : null}
      </h2>
      <p className="text-balance text-sm text-gray-500">
        You have started working on the project. Here are some tips to get most
        out of it.
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

      <p className="mt-4 font-medium">Happy coding!</p>

      <button
        className="absolute right-2.5 top-2.5 text-gray-600 hover:text-black"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
    </Modal>
  );
}
