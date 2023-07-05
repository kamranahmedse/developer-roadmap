import { useState } from 'preact/hooks';
import { IdentiferInput } from './IdentifierInput';
import { ResourceSelector } from './ResourceSelector';
import type { SelectorDataType } from '../SearchSelector';
import { httpPost } from '../../lib/http';

export function CreateTeamForm() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [type, setType] = useState<'company' | 'learning_club'>();
  const [teamSize, setTeamSize] = useState();
  const [identifier, setIdentifier] = useState('');
  const [roadmaps, setRoadmaps] = useState<SelectorDataType[]>([]);
  const [bestPractices, setBestPractices] = useState<SelectorDataType[]>([]);
  const validTeamSizes = ["0-1", "2-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-create-team`, {
      name,
      website,
      type,
      identifier,
      ...(type === 'company' && { teamSize }),
      roadmapIds: roadmaps.map((r) => r.id),
      bestPracticeIds: bestPractices.map((r) => r.id),
    })

    if (error) {
      console.error(error);
      return;
    }

    if (response) {
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full flex-col">
        <label for="name" className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          placeholder="roadmap.sh"
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
          value={website}
          onInput={(e) => setWebsite((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="mt-4 flex w-full flex-col">
        <label for="type" className='text-sm leading-none text-slate-500  after:text-red-400 after:content-["*"]'>
          Type
        </label>
        <select
          name="type"
          id="type"
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          defaultValue={type}
          onChange={(e) =>
            setType((e.target as HTMLSelectElement).value as any)
          }
        >
          <option value="" selected>Select type</option>
          <option value="company">Company</option>
          <option value="learning_club">Learning Club</option>
        </select>
      </div>

      {
        type === 'company' && (
          <div className="mt-4 flex w-full flex-col">
            <label for="team-size" className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'>
              Team size
            </label>
            <select
              name="team-size"
              id="team-size"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              required={type === 'company'}
              defaultValue={teamSize}
              onChange={(e) =>
                setTeamSize((e.target as HTMLSelectElement).value as any)
              }
            >
              <option value="" selected>Select team size</option>
              {validTeamSizes.map((size) => (
                <option value={size}>{size} people</option>
              ))}
            </select>
          </div>
        )
      }

      <IdentiferInput value={identifier} onChange={setIdentifier} />
      <ResourceSelector
        type="Roadmaps"
        resources={roadmaps}
        setResources={setRoadmaps}
      />
      <ResourceSelector
        type="Best Practices"
        resources={bestPractices}
        setResources={setBestPractices}
      />

      <div className="mt-4 flex w-full flex-col">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          Create
        </button>
      </div>
    </form >
  );
}
