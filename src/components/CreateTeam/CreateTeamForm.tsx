import { useState } from 'preact/hooks';
import { IdentiferInput } from './IdentifierInput';
import { ResourceSelector } from './ResourceSelector';
import type { SelectorDataType } from '../SearchSelector';

export function CreateTeamForm() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [type, setType] = useState<'company' | 'learning_club'>();
  const [identifier, setIdentifier] = useState('');
  const [roadmaps, setRoadmaps] = useState<SelectorDataType[]>([]);
  const [bestPractices, setBestPractices] = useState<SelectorDataType[]>([]);

  console.log(roadmaps);

  return (
    <form>
      <div className="flex w-full flex-col">
        <label for="name" className="text-sm leading-none text-slate-500">
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
        <label for="type" className="text-sm leading-none text-slate-500">
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
          <option value="company">Company</option>
          <option value="learning_club">Learning Club</option>
        </select>
      </div>
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
    </form>
  );
}
