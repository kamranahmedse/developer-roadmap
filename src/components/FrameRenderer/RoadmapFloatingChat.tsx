import { Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { RoadmapAIChatCard } from '../RoadmapAIChat/RoadmapAIChatCard';
import { lockBodyScroll } from '../../lib/dom';
import { useKeydown } from '../../hooks/use-keydown';

type RoadmapChatProps = {
  roadmapId: string;
};

export function RoadmapFloatingChat(props: RoadmapChatProps) {
  const { roadmapId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { data: roadmapDetail, isLoading: isRoadmapDetailLoading } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );

  useEffect(() => {
    lockBodyScroll(isOpen);
  }, [isOpen]);

  useKeydown('Escape', () => {
    setIsOpen(false);
  });

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}

      <div
        className={
          'animate-fade-slide-up fixed bottom-5 left-1/2 z-[99] max-h-[49vh] w-full max-w-[968px] -translate-x-1/4 transform flex-row gap-1.5 overflow-hidden px-4 transition-all duration-300 lg:flex'
        }
      >
        {isOpen && (
          <div className="flex h-full max-h-[49vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Messages area - scrollable */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <div className="flex flex-col gap-2 text-sm">
                <RoadmapAIChatCard
                  role="assistant"
                  jsx={
                    <span className="relative top-[2px]">
                      Hey, how can I help you?
                    </span>
                  }
                />
              </div>
            </div>

            {/* Input area - sticky at bottom */}
            <div className="border-t border-gray-200">
              <input
                type="text"
                autoFocus
                placeholder="Ask me anything about this roadmap..."
                className="w-full resize-none p-3 outline-none"
              />
            </div>
          </div>
        )}

        {!isOpen && (
          <button
            className={
              'relative mx-auto flex cursor-text items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 pr-8 pl-6 text-center text-black text-white shadow-2xl transition-all duration-300 hover:scale-101 hover:bg-stone-800'
            }
            onClick={() => setIsOpen(true)}
          >
            <Wand2 className="h-4 w-4 text-yellow-400" />
            <span className="mr-1 text-sm font-semibold text-yellow-400">
              AI Tutor
            </span>
            <span>
              Have a question? Type here
              <span className="relative top-[3px] left-[2px] inline-block h-4 w-1 animate-pulse bg-gray-300"></span>
            </span>
          </button>
        )}
      </div>
    </>
  );
}
