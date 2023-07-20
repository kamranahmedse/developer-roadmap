import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPut } from '../../lib/http';
import { Spinner } from '../ReactIcons/Spinner';
import { useAuth } from '../../hooks/use-auth';
import UploadProfilePicture from '../UpdateProfile/UploadProfilePicture';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { pageProgressMessage } from '../../stores/page';
import { useTeamId } from '../../hooks/use-team-id';
import { DeleteTeamPopup } from '../DeleteTeamPopup';
import { $currentTeam, $isCurrentTeamAdmin } from '../../stores/team';
import { useStore } from '@nanostores/preact';
import { useToast } from '../../hooks/use-toast';

export function UpdateTeamForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isCurrentTeamAdmin = useStore($isCurrentTeamAdmin);

  const toast = useToast();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [gitHub, setGitHub] = useState('');
  const [teamType, setTeamType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [roadmaps, setRoadmaps] = useState<string[]>([]);
  const [bestPractices, setBestPractices] = useState<string[]>([]);
  const validTeamSizes = [
    '0-1',
    '2-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
  ];
  const [isDisabled, setIsDisabled] = useState(false);
  const { teamId } = useTeamId();

  useEffect(() => {
    setIsDisabled(!isCurrentTeamAdmin);
  }, [isCurrentTeamAdmin]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !teamType) {
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpPut(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-team/${teamId}`,
      {
        name,
        website,
        type: teamType,
        gitHubUrl: gitHub || undefined,
        ...(teamType === 'company' && {
          teamSize,
          linkedInUrl: linkedIn || undefined,
        }),
      }
    );

    if (error) {
      setIsLoading(false);
      toast.error(error.message || 'Something went wrong');
      return;
    }

    if (response) {
      await loadTeam();
      setIsLoading(false);
      toast.success('Team updated successfully');
    }
  };

  async function loadTeam() {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`
    );
    if (error || !response) {
      console.log(error);
      return;
    }

    setName(response.name);
    setAvatar(response.avatar || '');
    setWebsite(response?.links?.website || '');
    setLinkedIn(response?.links?.linkedIn || '');
    setGitHub(response?.links?.github || '');
    setTeamType(response.type);
    if (response.teamSize) {
      setTeamSize(response.teamSize);
    }
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }
    loadTeam().finally(() => {
      pageProgressMessage.set('');
    });
  }, [teamId]);

  return (
    <div>
      <UploadProfilePicture
        isDisabled={isDisabled}
        type="logo"
        avatarUrl={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
        teamId={teamId!}
      />
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex w-full flex-col">
          <label
            for="name"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="roadmap.sh"
            disabled={isDisabled}
            required
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="mt-4 flex w-full flex-col">
          <label for="website" className="text-sm leading-none text-slate-500">
            Website
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://roadmap.sh"
            disabled={isDisabled}
            value={website}
            onInput={(e) => setWebsite((e.target as HTMLInputElement).value)}
          />
        </div>
        {teamType === 'company' && (
          <div className="mt-4 flex w-full flex-col">
            <label
              for="linkedIn"
              className="text-sm leading-none text-slate-500"
            >
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedIn"
              id="linkedIn"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="https://linkedin.com/company/roadmapsh"
              disabled={isDisabled}
              value={linkedIn}
              onInput={(e) => setLinkedIn((e.target as HTMLInputElement).value)}
            />
          </div>
        )}
        <div className="mt-4 flex w-full flex-col">
          <label for="gitHub" className="text-sm leading-none text-slate-500">
            GitHub URL
          </label>
          <input
            type="text"
            name="gitHub"
            id="gitHub"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="https://github.com/roadmapsh"
            disabled={isDisabled}
            value={gitHub}
            onInput={(e) => setGitHub((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="mt-4 flex w-full flex-col">
          <label
            for="type"
            className='text-sm leading-none text-slate-500  after:text-red-400 after:content-["*"]'
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            disabled={isDisabled}
            value={teamType}
            onChange={(e) =>
              setTeamType((e.target as HTMLSelectElement).value as any)
            }
          >
            <option value="" selected>
              Select type
            </option>
            <option value="company">Company</option>
            <option value="study_group">Study Group</option>
          </select>
        </div>

        {teamType === 'company' && (
          <div className="mt-4 flex w-full flex-col">
            <label
              for="team-size"
              className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
            >
              Team size
            </label>
            <select
              name="team-size"
              id="team-size"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              required={teamType === 'company'}
              disabled={isDisabled}
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

        <div className="mt-4 flex w-full flex-col">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? <Spinner /> : 'Update'}
          </button>
        </div>
      </form>

      {!isCurrentTeamAdmin && (
        <p className="mt-2 rounded-lg border border-red-300 bg-red-50 p-2 text-sm text-red-700">
          Only team admins can update team information.
        </p>
      )}

      {isCurrentTeamAdmin && (
        <>
          <hr class="my-8" />
          {isDeleting && (
            <DeleteTeamPopup
              onClose={() => {
                toast.success('Team deleted successfully');
                setIsDeleting(false);
              }}
            />
          )}
          <h2 class="text-xl font-bold sm:text-2xl">Delete Team</h2>
          <p class="mt-2 text-gray-400">
            Permanently delete this team and all of its resources.
          </p>

          <button
            onClick={() => setIsDeleting(true)}
            data-popup="delete-team-popup"
            class="font-regular mt-4 w-full rounded-lg bg-red-600 py-2 text-base text-white outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Delete Team
          </button>
        </>
      )}
    </div>
  );
}
