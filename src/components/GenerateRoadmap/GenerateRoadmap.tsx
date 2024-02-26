import { useRef, useState, type FormEvent } from 'react';
import './GenerateRoadmap.css';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { generateRoadmapFromJSON } from '../../../editor/utils/roadmap-generator';
import { renderFlowJSON } from '../../../editor/renderer/renderer';
import { replaceChildren } from '../../lib/dom';

export function GenerateRoadmap() {
  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [roadmapName, setRoadmapName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-roadmap`,
      {
        title: roadmapName,
      },
    );

    if (error || !response) {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    const { nodes, edges } = generateRoadmapFromJSON(response as any);
    const svg = await renderFlowJSON({ nodes, edges });
    if (roadmapContainerRef?.current) {
      replaceChildren(roadmapContainerRef?.current, svg);
    }
    setIsLoading(false);
  };

  return (
    <section className="container grid grid-cols-[280px,1fr]">
      <form
        className="h-full space-y-4 border-r px-4 py-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col">
          <label
            htmlFor="roadmap-name"
            className='text-sm leading-none text-slate-500 after:text-red-400 after:content-["*"]'
          >
            Roadmap Title
          </label>
          <input
            type="text"
            name="roadmap-name"
            id="roadmap-name"
            className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            required
            placeholder="Frontend"
            value={roadmapName}
            onInput={(e) =>
              setRoadmapName((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
        >
          {isLoading ? 'Please wait...' : 'Generate'}
        </button>
      </form>

      <div ref={roadmapContainerRef} className="px-4 py-10" />
    </section>
  );
}
