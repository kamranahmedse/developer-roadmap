import { useEffect, useState } from 'preact/hooks';
import { Stepper } from '../Stepper';
import { Step0, ValidTeamType } from './Step0';
import { Step1, ValidTeamSize } from './Step1';
import { Step2 } from './Step2';
import { httpGet } from '../../lib/http';
import { getUrlParams, setUrlParams } from '../../lib/browser';
import { pageProgressMessage } from '../../stores/page';

export interface TeamDocument {
  _id?: string;
  name: string;
  avatar?: string;
  creatorId: string;
  links: {
    website?: string;
    github?: string;
    linkedIn?: string;
  };
  type: ValidTeamType;
  canMemberSendInvite: boolean;
  teamSize?: ValidTeamSize;
  createdAt: Date;
  updatedAt: Date;
}

export function CreateTeamForm() {
  // Can't use hook `useParams` because it runs asynchronously
  const { s: queryStepIndex, t: teamId } = getUrlParams();

  const [team, setTeam] = useState<TeamDocument>();

  const [loadingTeam, setLoadingTeam] = useState(!!teamId && !team?._id);
  const [stepIndex, setStepIndex] = useState(0);
  async function loadTeam(
    teamIdToFetch: string,
    requiredStepIndex: number | string
  ) {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamIdToFetch}`
    );

    if (error || !response) {
      alert('Error loading team');
      window.location.href = '/account';
      return;
    }

    setTeam(response);
    setSelectedTeamType(response.type);
    setCompletedSteps([0, 1]);
    setStepIndex(parseInt(requiredStepIndex as string, 10));
  }

  useEffect(() => {
    if (!teamId || !queryStepIndex || team) {
      return;
    }

    pageProgressMessage.set('Fetching team');
    setLoadingTeam(true);
    loadTeam(teamId, queryStepIndex).finally(() => {
      setLoadingTeam(false);
      pageProgressMessage.set('');
    });

    // fetch team and move to step
  }, [teamId, queryStepIndex]);

  const [selectedTeamType, setSelectedTeamType] = useState<ValidTeamType>(
    team?.type || 'company'
  );

  const [completedSteps, setCompletedSteps] = useState([0]);
  if (loadingTeam) {
    return null;
  }

  let stepForm = null;
  if (stepIndex === 0) {
    stepForm = (
      <Step0
        team={team}
        selectedTeamType={selectedTeamType}
        setSelectedTeamType={setSelectedTeamType}
        onStepComplete={() => {
          if (team?._id) {
            setUrlParams({ t: team._id, s: '1' });
          }

          setCompletedSteps([0]);
          setStepIndex(1);
        }}
      />
    );
  } else if (stepIndex === 1) {
    stepForm = (
      <Step1
        team={team}
        onBack={() => {
          if (team?._id) {
            setUrlParams({ t: team._id, s: '0' });
          }

          setStepIndex(0);
        }}
        onStepComplete={(team: TeamDocument) => {
          const createdTeamId = team._id!;

          setUrlParams({ t: createdTeamId, s: '2' });

          setCompletedSteps([0, 1]);
          setStepIndex(2);
          setTeam(team);
        }}
        selectedTeamType={selectedTeamType}
      />
    );
  } else if (stepIndex === 2) {
    stepForm = (
      <Step2
        team={team!}
        onBack={() => {
          if (team) {
            setUrlParams({ t: team._id!, s: '1' });
          }

          setStepIndex(1);
        }}
        onNext={() => setStepIndex(3)}
      />
    );
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
