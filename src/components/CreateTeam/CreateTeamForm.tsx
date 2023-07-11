import { useState } from 'preact/hooks';
import { IdentiferInput } from './IdentifierInput';
import { ResourceSelector } from './ResourceSelector';
import { httpPost } from '../../lib/http';
import { Spinner } from '../ReactIcons/Spinner';

export interface TeamDocument {
  _id?: string;
  name: string;
  avatar?: string;
  creatorId: string;
  website?: string;
  type: 'company' | 'learning_club';
  canMemberSendInvite: boolean;
  teamSize?:
  | '0-1'
  | '2-10'
  | '11-50'
  | '51-200'
  | '201-500'
  | '501-1000'
  | '1000+';
  identifier: string;
  roadmapIds?: string[];
  bestPracticeIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function CreateTeamForm() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [teamType, setTeamType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [canMemberSendInvite, setCanMemberSendInvite] = useState(false);
  const [roadmaps, setRoadmaps] = useState<string[]>([]);
  const [bestPractices, setBestPractices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const validTeamSizes = [
    '0-1',
    '2-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
  ];

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !teamType || !identifier) {
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-team`,
      {
        name,
        website,
        type: teamType,
        identifier,
        canMemberSendInvite,
        ...(teamType === 'company' && { teamSize }),
        roadmapIds: roadmaps.join(','),
        bestPracticeIds: bestPractices.join(','),
      }
    );

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    if (response) {
      window.location.href = `/team/progress?t=${response._id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full flex-col">
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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

      <IdentiferInput
        value={identifier}
        onChange={setIdentifier}
        disbabled={isLoading}
      />
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

      <div className="mt-4 flex w-full flex-col">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-black h-11 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Create'}
        </button>
      </div>
    </form>
  );
}
