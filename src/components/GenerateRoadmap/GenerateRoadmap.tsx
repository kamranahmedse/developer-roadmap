import { useRef, useState, type FormEvent } from 'react';
import './GenerateRoadmap.css';
import { httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { generateAIRoadmapFromText } from '../../../editor/utils/roadmap-generator';
import { renderFlowJSON } from '../../../editor/renderer/renderer';
import { replaceChildren } from '../../lib/dom';
import { readAIRoadmapStream } from '../../helper/read-stream';
import { removeAuthToken } from '../../lib/jwt';
import { RoadmapSearch } from './RoadmapSearch.tsx';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { Download, PenSquare, Wand } from 'lucide-react';
import { ShareRoadmapButton } from '../ShareRoadmapButton.tsx';

export function GenerateRoadmap() {
  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  const toast = useToast();

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapTopic, setRoadmapTopic] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSubmitted(true);

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-roadmap`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title: roadmapTopic }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setIsLoading(false);

      // Logout user if token is invalid
      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
    }

    const reader = response.body?.getReader();

    if (!reader) {
      setIsLoading(false);
      toast.error('Something went wrong');
      return;
    }

    await readAIRoadmapStream(reader, async (result) => {
      const { nodes, edges } = generateAIRoadmapFromText(result);
      const svg = await renderFlowJSON({ nodes, edges });
      if (roadmapContainerRef?.current) {
        replaceChildren(roadmapContainerRef?.current, svg);
      }
    });

    setIsLoading(false);
  };

  if (!hasSubmitted) {
    return (
      <RoadmapSearch
        roadmapTopic={roadmapTopic}
        setRoadmapTopic={setRoadmapTopic}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <section className="flex flex-grow flex-col bg-gray-100">
      <div className="flex items-center justify-center border-b bg-white py-6">
        {isLoading && (
          <span className="flex items-center gap-2 rounded-full bg-black px-3 py-1 text-white">
            <Spinner isDualRing={false} innerFill={'white'} />
            Generating roadmap ..
          </span>
        )}
        {!isLoading && (
          <div className="flex max-w-[600px] flex-grow flex-col items-center">
            <div className="mt-2 flex w-full items-center justify-between text-sm">
              <span className="text-gray-800">
                0 of 5 roadmaps generated <button className='underline underline-offset-2 font-medium text-black'>Login to increase your limit</button>
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="my-3 flex w-full flex-row items-center justify-center gap-2"
            >
              <input
                type="text"
                autoFocus
                placeholder="e.g. Ansible"
                className="flex-grow rounded-md border border-gray-400 px-3 py-2 transition-colors focus:border-black focus:outline-none"
                value={roadmapTopic}
                onInput={(e) =>
                  setRoadmapTopic((e.target as HTMLInputElement).value)
                }
              />
              <button
                type={'submit'}
                className="flex flex-shrink-0 items-center gap-2 rounded-md border border-black bg-black px-4 py-2 text-white"
              >
                <Wand size={20} />
                Generate
              </button>
            </form>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 py-1.5 pl-2.5 pr-3 text-xs font-medium transition-opacity duration-300 hover:bg-yellow-500 sm:text-sm">
                  <Download size={15} />
                  Download
                </button>
                <ShareRoadmapButton
                  description={'c'}
                  pageUrl={'https://roadmap.sh'}
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-200 py-1.5 pl-2.5 pr-3 text-xs font-medium text-black transition-colors transition-opacity duration-300 hover:bg-gray-300 sm:text-sm">
                <PenSquare size={15} />
                Edit in Editor
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        ref={roadmapContainerRef}
        className="px-4 py-5 [&>svg]:mx-auto [&>svg]:max-w-[1300px] "
      />
    </section>
  );
}
