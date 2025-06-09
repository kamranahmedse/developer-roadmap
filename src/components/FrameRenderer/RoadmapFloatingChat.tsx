import { Wand2, SendIcon, PauseCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState, useMemo, Fragment } from 'react';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { RoadmapAIChatCard } from '../RoadmapAIChat/RoadmapAIChatCard';
import { lockBodyScroll } from '../../lib/dom';
import { useKeydown } from '../../hooks/use-keydown';
import {
  useRoadmapAIChat,
  type RoadmapAIChatHistoryType,
} from '../../hooks/use-roadmap-ai-chat';
import { flushSync } from 'react-dom';
import type { JSONContent } from '@tiptap/core';
import { slugify } from '../../lib/slugger';

type RoadmapChatProps = {
  roadmapId: string;
};

export function RoadmapFloatingChat(props: RoadmapChatProps) {
  const { roadmapId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const scrollareaRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const { data: roadmapDetail, isLoading: isRoadmapDetailLoading } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );

  const totalTopicCount = useMemo(() => {
    const allowedTypes = ['topic', 'subtopic', 'todo'];
    return (
      roadmapDetail?.json?.nodes.filter((node) =>
        allowedTypes.includes(node.type || ''),
      ).length ?? 0
    );
  }, [roadmapDetail]);

  const onSelectTopic = (topicId: string, topicTitle: string) => {
    // For now just scroll to bottom and close overlay
    const topicSlug = slugify(topicTitle) + '@' + topicId;
    window.dispatchEvent(
      new CustomEvent('roadmap.node.click', {
        detail: {
          resourceType: 'roadmap',
          resourceId: roadmapId,
          topicId: topicSlug,
          isCustomResource: false,
        },
      }),
    );
    // ensure chat visible
    flushSync(() => {
      setIsOpen(true);
    });
  };

  const {
    aiChatHistory,
    isStreamingMessage,
    streamedMessage,
    handleChatSubmit,
    handleAbort,
    scrollToBottom,
  } = useRoadmapAIChat({
    roadmapId,
    totalTopicCount,
    scrollareaRef,
    onSelectTopic,
  });

  useEffect(() => {
    lockBodyScroll(isOpen);
  }, [isOpen]);

  useKeydown('Escape', () => {
    setIsOpen(false);
  });

  const submitInput = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const json: JSONContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: trimmed,
            },
          ],
        },
      ],
    };

    setInputValue('');
    handleChatSubmit(json, isRoadmapDetailLoading);
  };

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

      <div className="animate-fade-slide-up fixed bottom-5 left-1/2 z-[99] max-h-[49vh] w-full max-w-[968px] -translate-x-1/4 transform flex-row gap-1.5 overflow-hidden px-4 transition-all duration-300 lg:flex">
        {isOpen && (
          <div className="flex h-full max-h-[49vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-3 py-2"
              ref={scrollareaRef}
            >
              <div className="flex flex-col gap-2 text-sm">
                <RoadmapAIChatCard
                  role="assistant"
                  jsx={<span>Hey, how can I help you?</span>}
                  isIntro
                />

                {aiChatHistory.map(
                  (chat: RoadmapAIChatHistoryType, index: number) => (
                    <Fragment key={`chat-${index}`}>
                      <RoadmapAIChatCard {...chat} />
                    </Fragment>
                  ),
                )}

                {isStreamingMessage && !streamedMessage && (
                  <RoadmapAIChatCard role="assistant" html="Thinking..." />
                )}

                {streamedMessage && (
                  <RoadmapAIChatCard role="assistant" jsx={streamedMessage} />
                )}
              </div>
            </div>

            {/* Input area */}
            <div className="relative flex items-center border-t border-gray-200 text-sm">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (isStreamingMessage) {
                      return;
                    }
                    submitInput();
                  }
                }}
                placeholder="Ask me anything about this roadmap..."
                className="w-full resize-none p-3 outline-none"
              />

              <button
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-zinc-500 hover:text-black disabled:opacity-50"
                disabled={isRoadmapDetailLoading}
                onClick={() => {
                  if (isStreamingMessage) {
                    handleAbort();
                    return;
                  }
                  submitInput();
                }}
              >
                {isStreamingMessage ? (
                  <PauseCircleIcon className="h-4 w-4" />
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {!isOpen && (
          <button
            className="relative mx-auto flex cursor-text items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 pr-8 pl-6 text-center text-white shadow-2xl transition-all duration-300 hover:scale-101 hover:bg-stone-800"
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => scrollToBottom(), 0);
            }}
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
