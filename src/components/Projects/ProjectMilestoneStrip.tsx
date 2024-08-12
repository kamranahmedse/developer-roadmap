import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';
import { StartProjectModal } from './StartProjectModal';
import { SubmitProjectModal } from './SubmitProjectModal';
import { pageProgressMessage } from '../../stores/page';
import { httpGet, httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';

type ProjectStatusResponse = {
  id?: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;

  upvotes: number;
  downvotes: number;
};

type ProjectMilestoneStripProps = {
  projectId: string;
};

export function ProjectMilestoneStrip(props: ProjectMilestoneStripProps) {
  const { projectId } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const [projectStatus, setProjectStatus] = useState<ProjectStatusResponse>({
    upvotes: 0,
    downvotes: 0,
  });

  const [isStartProjectModalOpen, setIsStartProjectModalOpen] = useState(false);
  const [isSubmitProjectModalOpen, setIsSubmitProjectModalOpen] =
    useState(false);

  const handleStartProject = async () => {
    pageProgressMessage.set('Starting project...');
    setIsStartProjectModalOpen(true);

    const { response, error } = await httpPost<{
      startedAt: Date;
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-start-project/${projectId}`, {});

    if (error || !response) {
      toast.error(error?.message || 'Failed to start project');
      pageProgressMessage.set('');
      return;
    }

    setStepIndex(1);
    setProjectStatus({
      ...projectStatus,
      startedAt: response.startedAt,
    });
    pageProgressMessage.set('');
  };

  const loadProjectStatus = async () => {
    setIsLoading(true);

    const { response, error } = await httpGet<ProjectStatusResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-project-status/${projectId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load project status');
      setIsLoading(false);
      return;
    }

    const { startedAt, submittedAt, upvotes } = response;

    if (upvotes >= 10) {
      setStepIndex(4);
    } else if (upvotes >= 5) {
      setStepIndex(3);
    } else if (submittedAt) {
      setStepIndex(2);
    } else if (startedAt) {
      setStepIndex(1);
    }

    setProjectStatus(response);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjectStatus().finally(() => {});
  }, []);

  const startProjectModal = isStartProjectModalOpen ? (
    <StartProjectModal
      onClose={() => setIsStartProjectModalOpen(false)}
      startedAt={projectStatus?.startedAt}
    />
  ) : null;
  const submitProjectModal = isSubmitProjectModalOpen ? (
    <SubmitProjectModal
      onClose={() => setIsSubmitProjectModalOpen(false)}
      projectId={projectId}
      onSubmit={(response) => {
        const { repositoryUrl, submittedAt } = response;

        setProjectStatus({
          ...projectStatus,
          repositoryUrl,
          submittedAt,
        });
        setStepIndex(2);
      }}
      repositoryUrl={projectStatus.repositoryUrl}
    />
  ) : null;

  return (
    <>
      {startProjectModal}
      {submitProjectModal}

      <div className="relative -mx-2 -mt-2 mb-5 overflow-hidden rounded-lg bg-gray-100/70 p-5">
        <div
          className={cn(
            'striped-loader absolute inset-0 z-10 bg-white',
            !isLoading && 'hidden',
          )}
        />

        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex >= 1} />

            <button
              className={cn(
                'mt-3 inline-flex self-center text-center text-sm font-medium text-blue-600 underline underline-offset-2 hover:opacity-60',
                stepIndex >= 1 && 'text-black no-underline',
              )}
              onClick={() => {
                if (stepIndex < 1) {
                  handleStartProject().finally(() => {});
                } else {
                  setIsStartProjectModalOpen(true);
                }
              }}
            >
              Start Project
            </button>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex >= 2} />

            <button
              className={cn(
                'mt-3 inline-flex self-center text-sm font-medium text-blue-600 underline underline-offset-2 hover:opacity-60',
                stepIndex >= 2 && 'text-black no-underline',
                stepIndex < 1 && 'text-black opacity-50 hover:opacity-50',
              )}
              onClick={() => setIsSubmitProjectModalOpen(true)}
              disabled={stepIndex < 1}
            >
              {projectStatus?.repositoryUrl
                ? 'Update Solution'
                : 'Submit Solution'}
            </button>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex >= 3} />

            <span
              className="mt-3 w-full text-center text-sm font-medium aria-disabled:opacity-50"
              aria-disabled={stepIndex < 3}
            >
              5 Upvotes
            </span>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex >= 4} isLast={true} />

            <span
              className="mt-3 w-full text-center text-sm font-medium aria-disabled:opacity-50"
              aria-disabled={stepIndex < 4}
            >
              10 Upvotes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

type MilestoneStepProps = {
  isActive: boolean;
  isLast?: boolean;
};

function MilestoneStep(props: MilestoneStepProps) {
  const { isActive = false, isLast = false } = props;

  return (
    <div
      className={cn(
        'relative h-1 w-full translate-x-1/2 bg-gray-300',
        isActive && 'bg-gray-500',
        isLast && 'bg-transparent',
      )}
    >
      <span
        className={cn(
          'absolute -top-[4px] left-0 size-3 -translate-x-1/2 rounded-full border bg-white',
          isActive && 'border-black bg-black',
          isLast && '-translate-x-0',
        )}
      ></span>
    </div>
  );
}
