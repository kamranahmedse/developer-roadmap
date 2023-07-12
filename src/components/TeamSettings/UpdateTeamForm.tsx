import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPut } from '../../lib/http';
import { Spinner } from '../ReactIcons/Spinner';
import { useAuth } from '../../hooks/use-auth';
import UploadProfilePicture from '../UpdateProfile/UploadProfilePicture';
import { ResourceSelector } from '../CreateTeam/ResourceSelector';
import { useParams } from '../../hooks/use-params';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { pageProgressMessage } from '../../stores/page';
import {useTeamId} from "../../hooks/use-team-id";

export function UpdateTeamForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [website, setWebsite] = useState('');
  const [teamType, setTeamType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [canMemberSendInvite, setCanMemberSendInvite] = useState(false);
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
  const user = useAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
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
        canMemberSendInvite,
        ...(teamType === 'company' && { teamSize }),
        roadmapIds: roadmaps.join(','),
        bestPracticeIds: bestPractices.join(','),
      }
    );

    if (error) {
      setIsLoading(false);
      setError(error.message || 'Something went wrong');
      setMessage('');
      return;
    }

    if (response) {
      await loadTeam();
      setIsLoading(false);
      setMessage('Team updated successfully');
      setError('');
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
    setWebsite(response.website || '');
    setTeamType(response.type);
    setCanMemberSendInvite(response.canMemberSendInvite);
    setRoadmaps(response.roadmapIds || []);
    setBestPractices(response.bestPracticeIds || []);
    if (response.teamSize) {
      setTeamSize(response.teamSize);
    }
    setIsDisabled(response.creatorId !== user?.id);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }
    loadTeam().finally(() => {
      pageProgressMessage.set('');
    })
  }, [teamId]);

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Team
        </h2>
        <p className="mt-2 text-gray-400">
          Update your team information.
        </p>
      </div>
      <UploadProfilePicture
        type="logo"
        label="Upload team logo"
        avatarUrl={
          avatar
            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
            : '/images/default-avatar.png'
        }
        teamId={teamId!}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col mt-4">
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
            <option value="learning_club">Learning Club</option>
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

        <ResourceSelector
          type="Roadmaps"
          resourcesIds={roadmaps}
          setResourcesIds={setRoadmaps}
        />
        <ResourceSelector
          type="Best Practices"
          resourcesIds={bestPractices}
          setResourcesIds={setBestPractices}
        />

        <div className="mt-4 flex w-full flex-col">
          <label
            for="can-member-send-invite"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >Can team members invite new members?</label>

          <div className="flex gap-2 items-center mt-2">
            <button type="button" className={`inline-flex items-center px-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none ${canMemberSendInvite ? 'bg-gray-200' : 'bg-white opacity-75'}`} onClick={() => setCanMemberSendInvite(true)}>
              Yes
            </button>
            <button type="button" className={`inline-flex items-center px-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none ${!canMemberSendInvite ? 'bg-gray-200' : 'bg-white opacity-75'}`} onClick={() => setCanMemberSendInvite(false)}>
              No
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-100 p-2 text-red-700">{error}</p>
        )}

        {message && (
          <p className="mt-4 rounded-lg bg-green-100 p-2 text-green-700">{message}</p>
        )}

        <div className="mt-4 flex w-full flex-col">
          <button
            type="submit"
            className="inline-flex w-full h-11 items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? <Spinner /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
