import { Flag, Play, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/classname.ts';
import { useStickyStuck } from '../../../hooks/use-sticky-stuck.tsx';
import { StepperAction } from './StepperAction.tsx';
import { StepperStepSeparator } from './StepperStepSeparator.tsx';
import { MilestoneStep } from './MilestoneStep.tsx';
import { httpGet } from '../../../lib/http.ts';
import { StartProjectModal } from '../StartProjectModal.tsx';
import { getRelativeTimeString } from '../../../lib/date.ts';
import { isLoggedIn } from '../../../lib/jwt.ts';
import { showLoginPopup } from '../../../lib/popup.ts';
import { SubmitProjectModal } from '../SubmitProjectModal.tsx';

type ProjectStatusResponse = {
  id?: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;

  upvotes: number;
  downvotes: number;
};

type ProjectStepperProps = {
  projectId: string;
};

export function ProjectStepper(props: ProjectStepperProps) {
  const { projectId } = props;

  const stickyElRef = useRef<HTMLDivElement>(null);
  const isSticky = useStickyStuck(stickyElRef, 8);

  const [isStartingProject, setIsStartingProject] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [projectStatus, setProjectStatus] = useState<ProjectStatusResponse>({
    upvotes: 0,
    downvotes: 0,
  });

  async function loadProjectStatus() {
    setIsLoadingStatus(true);

    const { response, error } = await httpGet<ProjectStatusResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-project-status/${projectId}`,
      {},
    );

    if (error || !response) {
      setError(error?.message || 'Error loading project status');
      setIsLoadingStatus(false);
      return;
    }

    const { startedAt, submittedAt, upvotes } = response;

    if (upvotes >= 10) {
      setActiveStep(4);
    } else if (upvotes >= 5) {
      setActiveStep(3);
    } else if (submittedAt) {
      setActiveStep(2);
    } else if (startedAt) {
      setActiveStep(1);
    }

    setProjectStatus(response);
    setIsLoadingStatus(false);
  }

  useEffect(() => {
    loadProjectStatus().finally(() => {});
  }, []);

  return (
    <div
      ref={stickyElRef}
      className={cn(
        'sticky top-0 my-5 overflow-hidden rounded-lg border bg-white transition-all',
        {
          '-mx-5 rounded-none border-x-0 border-t-0 bg-gray-50': isSticky,
        },
      )}
    >
      {isSubmittingProject && (
        <SubmitProjectModal
          onClose={() => setIsSubmittingProject(false)}
          projectId={projectId}
          onSubmit={(response) => {
            const { repositoryUrl, submittedAt } = response;

            setProjectStatus({
              ...projectStatus,
              repositoryUrl,
              submittedAt,
            });

            setActiveStep(2);
          }}
          repositoryUrl={projectStatus.repositoryUrl}
        />
      )}
      {isStartingProject && (
        <StartProjectModal
          projectId={projectId}
          onStarted={(startedAt) => {
            setProjectStatus({
              ...projectStatus,
              startedAt,
            });
            setActiveStep(1);
          }}
          startedAt={projectStatus?.startedAt}
          onClose={() => setIsStartingProject(false)}
        />
      )}

      {error && (
        <div className="absolute inset-0 bg-red-100 p-2 text-sm text-red-500">
          {error}
        </div>
      )}
      {isLoadingStatus && (
        <div className={cn('striped-loader absolute inset-0 z-10 bg-white')} />
      )}
      <div
        className={cn(
          'px-4 py-2 text-sm text-gray-500 transition-colors bg-gray-100',
          {
            'bg-purple-600 text-white': isSticky,
          },
        )}
      >
        {activeStep === 0 && (
          <>
            Start building, submit solution and get feedback from the community.
          </>
        )}
        {activeStep === 1 && (
          <>
            Started working{' '}
            <span
              className={cn('font-medium text-gray-800', {
                'text-purple-200': isSticky,
              })}
            >
              {getRelativeTimeString(projectStatus.startedAt!)}
            </span>
            . Follow{' '}
            <button
              className={cn('underline underline-offset-2 hover:text-black', {
                'text-purple-100 hover:text-white': isSticky,
              })}
              onClick={() => {
                setIsStartingProject(true);
              }}
            >
              these tips
            </button>{' '}
            to get most out of it.
          </>
        )}
        {activeStep >= 2 && (
          <>
            Congrats on submitting your solution.{' '}
            <button
              className={cn('underline underline-offset-2 hover:text-black', {
                'text-purple-100 hover:text-white': isSticky,
              })}
              onClick={() => {
                setIsSubmittingProject(true);
              }}
            >
              View or update your submission.
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-[60px] items-center justify-between gap-3 px-4">
        <StepperAction
          isActive={activeStep === 0}
          isCompleted={activeStep > 0}
          icon={Play}
          text={activeStep > 0 ? 'Started Working' : 'Start Working'}
          number={1}
          onClick={() => {
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }

            setIsStartingProject(true);
          }}
        />
        <StepperStepSeparator isActive={activeStep > 0} />
        <StepperAction
          isActive={activeStep === 1}
          isCompleted={activeStep > 1}
          icon={Send}
          onClick={() => {
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }

            setIsSubmittingProject(true);
          }}
          text={activeStep > 1 ? 'Submitted' : 'Submit Solution'}
          number={2}
        />
        <StepperStepSeparator isActive={activeStep > 1} />
        <MilestoneStep
          isActive={activeStep === 2}
          isCompleted={activeStep > 2}
          icon={Flag}
          text={
            activeStep == 2
              ? `${projectStatus.upvotes} / 5 upvotes`
              : `5 upvotes`
          }
        />
        <StepperStepSeparator isActive={activeStep > 2} />
        <MilestoneStep
          isActive={activeStep === 3}
          isCompleted={activeStep > 3}
          icon={Flag}
          text={
            activeStep == 3
              ? `${projectStatus.upvotes} / 10 upvotes`
              : activeStep > 3
                ? `${projectStatus.upvotes} upvotes`
                : `10 upvotes`
          }
        />
      </div>
    </div>
  );
}
