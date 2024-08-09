import { useState } from 'react';
import { cn } from '../../lib/classname';
import { StartProjectModal } from './StartProjectModal';
import { SubmitProjectModal } from './SubmitProjectModal';

type ProjectMilestoneStripProps = {
  projectId: string;
};

export function ProjectMilestoneStrip(props: ProjectMilestoneStripProps) {
  const { projectId } = props;

  const [stepIndex, setStepIndex] = useState(0);
  const [isStartProjectModalOpen, setIsStartProjectModalOpen] = useState(false);
  const [isSubmitProjectModalOpen, setIsSubmitProjectModalOpen] =
    useState(false);

  const startProjectModal = isStartProjectModalOpen ? (
    <StartProjectModal onClose={() => setIsStartProjectModalOpen(false)} />
  ) : null;
  const submitProjectModal = isSubmitProjectModalOpen ? (
    <SubmitProjectModal
      onClose={() => setIsSubmitProjectModalOpen(false)}
      projectId={projectId}
      onSubmit={() => setStepIndex(2)}
    />
  ) : null;

  return (
    <>
      {startProjectModal}
      {submitProjectModal}

      <div className="relative -mx-2 -mt-2 mb-5 rounded-lg bg-gray-100/70 p-5">
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex === 1} />

            <button
              className="mt-3 text-left text-sm font-medium text-blue-600 underline underline-offset-2"
              onClick={() => setIsStartProjectModalOpen(true)}
            >
              Start Project
            </button>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex === 2} position="middle" />

            <button
              className="mt-3 text-sm font-medium text-blue-600 underline underline-offset-2"
              onClick={() => setIsSubmitProjectModalOpen(true)}
            >
              Submit Solution
            </button>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex === 2} position="middle" />

            <span className="mt-3 w-full text-center text-sm font-medium">
              Get 5 Likes
            </span>
          </div>
          <div className="flex flex-col">
            <MilestoneStep isActive={stepIndex === 2} position="end" />

            <span className="mt-3 w-full text-right text-sm font-medium">
              Get 10 Likes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

type MilestoneStepProps = {
  isActive: boolean;
  position?: 'start' | 'middle' | 'end';
};

function MilestoneStep(props: MilestoneStepProps) {
  const { isActive = false, position = 'start' } = props;

  return (
    <div
      className={cn(
        'relative h-1 w-full bg-gray-300',
        isActive && 'bg-gray-500',
      )}
    >
      <span
        className={cn(
          'absolute -top-[4px] size-3 -translate-x-1/2 rounded-full border bg-white',
          isActive && 'border-black bg-black',
          position === 'start' && 'left-0',
          position === 'middle' && 'left-1/2',
          position === 'end' && 'right-0 translate-x-1/2',
        )}
      ></span>
    </div>
  );
}
