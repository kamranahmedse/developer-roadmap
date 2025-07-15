import type { TeamDocument } from './CreateTeamForm';
import { httpPut } from '../../lib/http';
import { useState } from 'react';
import { NextButton } from './NextButton';
import { BuildingIcon } from '../ReactIcons/BuildingIcon.tsx';
import { UsersIcon } from '../ReactIcons/UsersIcon.tsx';

export const validTeamTypes = [
  {
    value: 'company',
    label: 'Company',
    icon: BuildingIcon,
    description:
      'Track the skills and learning progress of the tech team at your company',
  },
  {
    value: 'study_group',
    label: 'Study Group',
    icon: UsersIcon,
    description:
      'Invite your friends or course-mates and track your learning progress together',
  },
] as const;

export type ValidTeamType = (typeof validTeamTypes)[number]['value'];

type Step0Props = {
  team?: TeamDocument;
  selectedTeamType: ValidTeamType;
  setSelectedTeamType: (teamType: ValidTeamType) => void;
  onStepComplete: () => void;
};

export function Step0(props: Step0Props) {
  const { team, selectedTeamType, onStepComplete, setSelectedTeamType } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function onNextClick() {
    if (!team) {
      onStepComplete();
      return;
    }

    setIsLoading(true);
    setError('');

    const { response, error } = await httpPut(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-team/${team._id}`,
      {
        name: team.name,
        website: team?.links?.website || undefined,
        type: selectedTeamType,
        gitHubUrl: team?.links?.github || undefined,
        ...(selectedTeamType === 'company' && {
          teamSize: team.teamSize,
          linkedInUrl: team?.links?.linkedIn || undefined,
        }),
      },
    );

    if (error || !response) {
      setIsLoading(false);
      setError(error?.message || 'Something went wrong');
      return;
    }

    setIsLoading(false);
    setError('');
    onStepComplete();
  }

  return (
    <>
      <div className={'flex flex-col gap-3 sm:flex-row'}>
        {validTeamTypes.map((validTeamType) => (
          <button
            key={validTeamType.value}
            className={`flex grow flex-col items-center rounded-lg border px-5 pb-10 pt-12 ${
              validTeamType.value == selectedTeamType
                ? 'border-gray-400 bg-gray-100'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedTeamType(validTeamType.value)}
          >
            {
              <validTeamType.icon
                className={`mb-3 h-12 w-12 opacity-10 ${
                  validTeamType.value === selectedTeamType ? 'opacity-100' : ''
                }`}
              />
            }
            <span className="mb-2 block text-2xl font-bold">
              {validTeamType.label}
            </span>
            <span className="text-sm leading-[21px] text-gray-500">
              {validTeamType.description}
            </span>
          </button>
        ))}
      </div>

      {/*Error message*/}
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

      <div className="mt-4 flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center">
        <a
          href="/account"
          className={
            'rounded-md border border-red-400 bg-white px-8 py-2 text-center text-red-500'
          }
        >
          Cancel
        </a>
        <NextButton
          type={'button'}
          onClick={onNextClick}
          isLoading={isLoading}
          text={'Next Step'}
          loadingMessage={'Updating team ..'}
        />
      </div>
    </>
  );
}
