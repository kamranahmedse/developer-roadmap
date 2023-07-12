import { useState } from 'preact/hooks';
import { Stepper } from '../Stepper';
import { Step0, ValidTeamType } from './Step0';
import { Step1, ValidTeamSize } from './Step1';
import { Step2 } from './Step2';

export interface TeamDocument {
  _id?: string;
  name: string;
  avatar?: string;
  creatorId: string;
  website?: string;
  type: ValidTeamType;
  canMemberSendInvite: boolean;
  teamSize?: ValidTeamSize;
  identifier: string;
  roadmapIds?: string[];
  bestPracticeIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function CreateTeamForm() {
  const [stepIndex, setStepIndex] = useState(0);

  const [selectedTeamType, setSelectedTeamType] =
    useState<ValidTeamType>('company');

  const [completedSteps, setCompletedSteps] = useState([0]);

  let stepForm = null;
  if (stepIndex === 0) {
    stepForm = (
      <Step0
        selectedTeamType={selectedTeamType}
        setSelectedTeamType={setSelectedTeamType}
        onStepComplete={() => {
          setCompletedSteps([0]);
          setStepIndex(1);
        }}
      />
    );
  } else if (stepIndex === 1) {
    stepForm = (
      <Step1
        onBack={() => setStepIndex(0)}
        onStepComplete={(teamId: string) => {
          // Update the URL and attach the new roadmap type
          if (window?.history?.pushState) {
            const url = new URL(window.location.href);

            url.searchParams.delete('t');
            url.searchParams.delete('s');
            url.searchParams.set('t', teamId);
            url.searchParams.set('s', '2');

            window.history.pushState(null, '', url.toString());

            setCompletedSteps([0, 1]);
            setStepIndex(2);
          } else {
            window.location.href = `/team/new?t=${teamId}&s=2`;
          }
        }}
        selectedTeamType={selectedTeamType}
      />
    );
  } else if (stepIndex === 2) {
    stepForm = <Step2 setStepIndex={setStepIndex} />;
  }

  return (
    <div className={'mx-auto max-w-[700px] py-6'}>
      <div className={'mb-8 flex flex-col items-center'}>
        <h1 className={'text-4xl font-bold'}>Create Team</h1>
        <p className={'mt-2 text-gray-500'}>
          Complete the steps below to create your team
        </p>
      </div>
      <div className="mb-8 mt-8 flex w-full">
        <Stepper
          activeIndex={stepIndex}
          completeSteps={completedSteps}
          steps={[
            { label: 'Type' },
            { label: 'Details' },
            { label: 'Skills' },
            { label: 'Members' },
          ]}
        />
      </div>

      {stepForm}
    </div>
  );
}
