import { Wand } from 'lucide-react';
import type { FormEvent } from 'react';

type RoadmapSearchProps = {
  roadmapTopic: string;
  setRoadmapTopic: (topic: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  limit: number;
  limitUsed: number;
};

export function RoadmapSearch(props: RoadmapSearchProps) {
  const {
    roadmapTopic,
    setRoadmapTopic,
    handleSubmit,
    limit = 0,
    limitUsed = 0,
  } = props;

  return (
    <div className="flex flex-grow flex-col items-center justify-center py-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="relative text-3xl font-medium">
          Generate roadmaps with AI
        </h1>
        <p className="text-lg text-gray-500">
          Enter a topic and let the AI generate a roadmap for you
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="my-6 flex w-full max-w-[600px] flex-row"
      >
        <input
          autoFocus
          type="text"
          placeholder="e.g. Ansible"
          className="w-full rounded-md border border-gray-400 px-3 py-2.5 transition-colors focus:border-black focus:outline-none"
          value={roadmapTopic}
          onInput={(e) => setRoadmapTopic((e.target as HTMLInputElement).value)}
        />
        <button className="ml-2 flex flex-shrink-0 items-center gap-2 rounded-md bg-black px-4 py-2 text-white">
          <Wand size={20} />
          Generate
        </button>
      </form>
      <div className="mb-36">
        <p className="text-gray-500">
          You have generated{' '}
          <span className="text-gray-800">
            {limitUsed} of ${limit}
          </span>{' '}
          roadmaps today.{' '}
          <button className="font-semibold text-black underline underline-offset-2">
            Log in to increase your limit
          </button>
        </p>
      </div>
    </div>
  );
}
