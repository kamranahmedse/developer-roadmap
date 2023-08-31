import { useEffect, useState } from 'react';
import { Stepper } from '../Stepper';
import { Step0, ValidTeamType } from './Step0';
import { Step1, ValidTeamSize } from './Step1';
import { Step2 } from './Step2';
import { httpGet } from '../../lib/http';
import { getUrlParams, setUrlParams } from '../../lib/browser';
import { pageProgressMessage } from '../../stores/page';
import type { TeamResourceConfig } from './RoadmapSelector';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import {useToast} from "../../hooks/use-toast";

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

  const toast = useToast();
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
      toast.error(error?.message || 'Error loading team');
      window.location.href = '/account';
      return;
    }

    const requiredStepIndexNumber = parseInt(requiredStepIndex as string, 10);
    const completedSteps = Array(requiredStepIndexNumber)
      .fill(1)
      .map((_, counter) => counter);

    setTeam(response);
    setSelectedTeamType(response.type);
    setCompletedSteps(completedSteps);
    setStepIndex(requiredStepIndexNumber);

    await loadTeamResourceConfig(teamIdToFetch);
  }

  const [teamResourceConfig, setTeamResourceConfig] =
    useState<TeamResourceConfig>([]);

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`
    );
    if (error || !Array.isArray(response)) {
      console.error(error);
      return;
    }

    setTeamResourceConfig(response);
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
        teamResourceConfig={teamResourceConfig}
        setTeamResourceConfig={setTeamResourceConfig}
        onBack={() => {
          if (team) {
            setUrlParams({ t: team._id!, s: '1' });
          }

          setStepIndex(1);
        }}
        onNext={() => {
          setUrlParams({ t: teamId!, s: '3' });
          setCompletedSteps([0, 1, 2]);
          setStepIndex(3);
        }}
      />
    );
  } else if (stepIndex === 3) {
    stepForm = (
      <Step3
        team={team}
        onBack={() => {
          if (team) {
            setUrlParams({ t: team._id!, s: '2' });
          }

          setStepIndex(2);
        }}
        onNext={() => {
          if (team) {
            setUrlParams({ t: team._id!, s: '4' });
          }

          setCompletedSteps([0, 1, 2, 3]);
          setStepIndex(4);
        }}
      />
    );
  } else if (stepIndex === 4) {
    stepForm = <Step4 team={team!} />;
  }

  return (
    <div className={'mx-auto max-w-[700px] py-1 md:py-6'}>
      <div className={'mb-3 md:mb-8 pb-3 md:pb-0 border-b md:border-b-0 flex flex-col items-start md:items-center'}>
        <h1 className={'text-xl md:text-4xl font-bold'}>Create Team</h1>
        <p className={'mt-1 md:mt-2 text-sm md:text-base text-gray-500'}>
          Complete the steps below to create your team
        </p>
      </div>
      <div className="mb-8 mt-8 hidden sm:flex w-full">
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
