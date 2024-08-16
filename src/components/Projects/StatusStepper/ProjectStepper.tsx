import { Flag, Play, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/classname.ts';
import { useStickyStuck } from '../../../hooks/use-sticky-stuck.tsx';
import { StepperAction } from './StepperAction.tsx';
import { StepperStepSeparator } from './StepperStepSeparator.tsx';
import { MilestoneStep } from './MilestoneStep.tsx';
import { httpGet } from '../../../lib/http.ts';

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
      setActiveStep(4);
    } else if (submittedAt) {
      setActiveStep(3);
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
        'sticky top-0 -mx-2 -mt-2 mb-5 overflow-hidden rounded-lg border bg-white transition-all',
        {
          '-mx-5 rounded-none border-x-0 border-t-0 bg-gray-50': isSticky,
        },
      )}
    >
      {isLoadingStatus && (
        <div className={cn('striped-loader absolute inset-0 z-10 bg-white')} />
      )}
      <div
        className={cn(
          'border-b bg-gray-100 px-4 py-2 text-sm text-gray-500 transition-colors',
          {
            'bg-purple-600 text-white': isSticky,
          },
        )}
      >
        Start building, submit solution and get feedback from the community.
      </div>

      <div className="flex min-h-[60px] items-center justify-between gap-3 px-4">
        <StepperAction
          isActive={activeStep === 0}
          isCompleted={activeStep > 0}
          icon={Play}
          text={activeStep > 0 ? 'Started Working' : 'Start Working'}
          number={1}
        />
        <StepperStepSeparator isActive={activeStep > 0} />
        <StepperAction
          isActive={activeStep === 1}
          isCompleted={activeStep > 1}
          icon={Send}
          text={activeStep > 1 ? 'Submitted' : 'Submit Solution'}
          number={2}
        />
        <StepperStepSeparator isActive={activeStep > 1} />
        <MilestoneStep
          isCompleted={activeStep > 2}
          icon={Flag}
          text={'5 upvotes'}
        />
        <StepperStepSeparator isActive={activeStep > 2} />
        <MilestoneStep
          isCompleted={activeStep > 3}
          icon={Flag}
          text={'10 upvotes'}
        />
      </div>
    </div>
  );
}
