import { useEffect, useRef, useState } from 'preact/hooks';
import { AppError, httpPost, httpPut } from '../../lib/http';
import type { ValidTeamType } from './Step0';
import type { TeamDocument } from './CreateTeamForm';
import { NextButton } from './NextButton';

export const validTeamSizes = [
  '0-1',
  '2-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
] as const;

export type ValidTeamSize = (typeof validTeamSizes)[number];

type Step1Props = {
  team?: TeamDocument;
  selectedTeamType: ValidTeamType;
  onStepComplete: (team: TeamDocument) => void;
  onBack: () => void;
};

export function Step1(props: Step1Props) {
  const { team, selectedTeamType, onBack, onStepComplete } = props;
  const [error, setError] = useState('');

  const nameRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!nameRef.current) {
      return;
    }

    nameRef.current.focus();
  }, [nameRef]);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(team?.name || '');
  const [website, setWebsite] = useState(team?.links?.website || '');
  const [linkedInUrl, setLinkedInUrl] = useState(team?.links?.linkedIn || '');
  const [gitHubUrl, setGitHubUrl] = useState(team?.links?.github || '');
  const [teamSize, setTeamSize] = useState<ValidTeamSize>(
    team?.teamSize || ('' as any)
  );

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !selectedTeamType) {
      setIsLoading(false);
      return;
    }

    let response: TeamDocument | undefined;
    let error: AppError | undefined;

    if (!team?._id) {
      ({ response, error } = await httpPost(
        `${import.meta.env.PUBLIC_API_URL}/v1-create-team`,
        {
          name,
          website: website || undefined,
          type: selectedTeamType,
          gitHubUrl: gitHubUrl || undefined,
          ...(selectedTeamType === 'company' && {
            teamSize,
            linkedInUrl: linkedInUrl || undefined,
          }),
          roadmapIds: [],
          bestPracticeIds: [],
        }
      ));

      if (error || !response?._id) {
        setError(error?.message || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      onStepComplete(response as TeamDocument);
    } else {
      ({ response, error } = await httpPut(
        `${import.meta.env.PUBLIC_API_URL}/v1-update-team/${team._id}`,
        {
          name,
          website: website || undefined,
          type: selectedTeamType,
          gitHubUrl: gitHubUrl || undefined,
          ...(selectedTeamType === 'company' && {
            teamSize,
            linkedInUrl: linkedInUrl || undefined,
          }),
        }
      ));

      if (error || (response as any)?.status !== 'ok') {
        setError(error?.message || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      onStepComplete({
        ...team,
        name,
        _id: team._id,
        links: {
          website: website || team?.links?.website,
          linkedIn: linkedInUrl || team?.links?.linkedIn,
          github: gitHubUrl || team?.links?.github,
        },
        type: selectedTeamType,
        teamSize: teamSize!,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full flex-col">
        <label
          for="name"
          className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
        >
          {selectedTeamType === 'company' ? 'Company Name' : 'Group Name'}
        </label>
        <input
          type="text"
          name="name"
          ref={nameRef as any}
          autofocus={true}
          id="name"
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          placeholder="roadmap.sh"
          disabled={isLoading}
          required
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
      </div>

      {selectedTeamType === 'company' && (
        <div className="mt-4 flex w-full flex-col">
          <label
            for="website"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Website
          </label>
          <input
            type="url"
            name="website"
            required
            id="website"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://roadmap.sh"
            disabled={isLoading}
            value={website}
            onInput={(e) => setWebsite((e.target as HTMLInputElement).value)}
          />
        </div>
      )}

      {selectedTeamType === 'company' && (
        <div className="mt-4 flex w-full flex-col">
          <label for="website" className="text-sm leading-none text-slate-500">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="website"
            id="website"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://www.linkedin.com/company/roadmapsh"
            disabled={isLoading}
            value={linkedInUrl}
            onInput={(e) =>
              setLinkedInUrl((e.target as HTMLInputElement).value)
            }
          />
        </div>
      )}

      <div className="mt-4 flex w-full flex-col">
        <label for="website" className="text-sm leading-none text-slate-500">
          GitHub Organization URL
        </label>
        <input
          type="url"
          name="website"
          id="website"
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          placeholder="https://github.com/roadmapsh"
          disabled={isLoading}
          value={gitHubUrl}
          onInput={(e) => setGitHubUrl((e.target as HTMLInputElement).value)}
        />
      </div>

      {selectedTeamType === 'company' && (
        <div className="mt-4 flex w-full flex-col">
          <label
            for="team-size"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Company Size
          </label>
          <select
            name="team-size"
            id="team-size"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required={selectedTeamType === 'company'}
            disabled={isLoading}
            value={teamSize}
            onChange={(e) =>
              setTeamSize((e.target as HTMLSelectElement).value as any)
            }
          >
            <option value="" selected>
              Select team size
            </option>
            {validTeamSizes.map((size) => (
              <option value={size}>{size} people</option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-4 flex flex-row items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className={
            'rounded-md border border-red-400 bg-white px-4 py-2 text-red-500'
          }
        >
          <span className="mr-1">&larr;</span>
          Previous Step
        </button>
        <NextButton
          isLoading={isLoading}
          text={'Next Step'}
          type={'submit'}
          loadingMessage={'Creating team ..'}
        />
      </div>
    </form>
  );
}
