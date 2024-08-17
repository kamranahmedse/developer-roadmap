import { Check, CopyIcon, ServerCrash } from 'lucide-react';
import { Modal } from '../Modal';
import { getRelativeTimeString } from '../../lib/date';
import { useEffect, useState } from 'react';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { httpPost } from '../../lib/http.ts';
import { CheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { useCopyText } from '../../hooks/use-copy-text.ts';

type StepLabelProps = {
  label: string;
};

function StepLabel(props: StepLabelProps) {
  const { label } = props;

  return (
    <span className="flex-shrink-0 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
      {label}
    </span>
  );
}

type StartProjectModalProps = {
  projectId: string;
  onClose: () => void;
  startedAt?: Date;
  onStarted: (startedAt: Date) => void;
};

export function StartProjectModal(props: StartProjectModalProps) {
  const { onClose, startedAt, onStarted, projectId } = props;

  const [isStartingProject, setIsStartingProject] = useState(true);
  const [error, setError] = useState<string | null>();

  const { isCopied, copyText } = useCopyText();

  const projectUrl = `${import.meta.env.PUBLIC_APP_URL}/projects/${projectId}`;

  const formattedStartedAt = startedAt ? getRelativeTimeString(startedAt) : '';

  async function handleStartProject() {
    if (!projectId || startedAt) {
      return;
    }

    setIsStartingProject(true);
    const { response, error } = await httpPost<{
      startedAt: Date;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-start-project/${projectId}`, {});

    if (error || !response) {
      setError(error?.message || 'Failed to start project');
      setIsStartingProject(false);
      return;
    }

    onStarted(response.startedAt);
  }

  useEffect(() => {
    handleStartProject().finally(() => setIsStartingProject(false));
  }, []);

  if (error) {
    return (
      <Modal onClose={onClose} bodyClassName="h-auto text-red-500">
        <div className="flex flex-col items-center justify-center gap-2 pb-10 pt-12">
          <ServerCrash className={'h-6 w-6'} />
          <p className="font-medium">{error}</p>
        </div>
      </Modal>
    );
  }

  if (isStartingProject) {
    return (
      <Modal onClose={onClose} bodyClassName="h-auto">
        <div className="flex flex-col items-center justify-center gap-4 pb-10 pt-12">
          <Spinner className={'h-6 w-6'} isDualRing={false} />
          <p className="font-medium">Starting project ..</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={onClose}
      bodyClassName="h-auto p-4 relative overflow-hidden"
      wrapperClassName={'max-w-md'}
    >
      <p className="-mx-4 -mt-4 flex items-center bg-yellow-200 px-3 py-2 text-sm text-yellow-900">
        <CheckIcon additionalClasses="mr-1.5 w-[15px] text-yellow-800 h-[15px]" />
        <span className="mr-1.5 font-normal">Project started</span>{' '}
        <span className="font-semibold">{formattedStartedAt}</span>
      </p>
      <h2 className="mb-1 mt-5 text-2xl font-semibold text-gray-800">
        Start Building
      </h2>
      <p className="text-gray-700">
        Follow these steps to complete the project.
      </p>

      <div className="my-5 space-y-1.5 marker:text-gray-400">
        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          1. Create a new public repository on GitHub.
        </p>

        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          2. Complete the project according to the requirements and push your code
          to the GitHub repository.
        </p>

        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          3. Add a README file with instructions to run the project and the{' '}
          <button
            onClick={() => {
              copyText(projectUrl);
            }}
            className="font-semibold"
          >
            {!isCopied && (
              <span className="text-purple-600">
                project page URL
                <CopyIcon
                  className="relative -top-px ml-1 inline-block h-4 w-4"
                  strokeWidth={2.5}
                />
              </span>
            )}
            {isCopied && (
              <>
                copied URL
                <Check className="inline-block h-4 w-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        </p>
        <p className="mt-1 rounded-lg bg-gray-200 p-2 text-sm text-gray-900">
          4. Once done, submit your solution to help the others learn and get feedback
          from the community.
        </p>
      </div>

      <div className="mb-5">
        <p className='text-sm'>
          If you get stuck, you can always ask for help in the community{' '}
          <a
            href="https://roadmap.sh/discord"
            target="_blank"
            className="font-medium underline underline-offset-2"
          >
            chat on discord
          </a>
          .
        </p>
      </div>

      <button
        className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-900"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
}
