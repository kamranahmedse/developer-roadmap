import { useQuery } from '@tanstack/react-query';
import type { JSONContent } from '@tiptap/core';
import {
  AppWindow,
  BookOpen,
  MessageCirclePlus,
  PauseCircleIcon,
  SendIcon,
  Trash2,
  Wand2,
  X,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useKeydown } from '../../hooks/use-keydown';
import {
  useRoadmapAIChat,
  type RoadmapAIChatHistoryType,
} from '../../hooks/use-roadmap-ai-chat';
import { cn } from '../../lib/classname';
import { lockBodyScroll } from '../../lib/dom';
import { slugify } from '../../lib/slugger';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { roadmapQuestionsOptions } from '../../queries/roadmap-questions';
import { queryClient } from '../../stores/query-client';
import { RoadmapAIChatCard } from '../RoadmapAIChat/RoadmapAIChatCard';

type ChatHeaderButtonProps = {
  onClick?: () => void;
  href?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  target?: string;
};

function ChatHeaderButton(props: ChatHeaderButtonProps) {
  const { onClick, href, icon, children, className, target } = props;

  const classNames = cn(
    'flex items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-gray-900',
    className,
  );

  if (!onClick && !href) {
    return (
      <span className={classNames}>
        {icon}
        {children && <span>{children}</span>}
      </span>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel="noopener noreferrer"
        className={classNames}
      >
        {icon}
        {children && <span>{children}</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classNames}>
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}

type RoadmapChatProps = {
  roadmapId: string;
};

export function RoadmapFloatingChat(props: RoadmapChatProps) {
  const { roadmapId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const scrollareaRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch questions from API
  const { data: questionsData } = useQuery(
    roadmapQuestionsOptions(roadmapId),
    queryClient,
  );

  // Randomly select 4 questions to display
  const defaultQuestions = useMemo(() => {
    if (!questionsData?.questions || questionsData.questions.length === 0) {
      return [];
    }
    const shuffled = [...questionsData.questions].sort(
      () => 0.5 - Math.random(),
    );
    return shuffled.slice(0, 4);
  }, [questionsData]);

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
    clearChat,
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

  function textToJSON(text: string): JSONContent {
    return {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
    };
  }

  const submitInput = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const json: JSONContent = textToJSON(trimmed);

    setInputValue('');
    handleChatSubmit(json, isRoadmapDetailLoading);
  };

  const hasMessages = aiChatHistory.length > 0;

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
        className={cn(
          'animate-fade-slide-up fixed bottom-5 left-1/2 z-91 max-h-[49vh] max-w-[968px] -translate-x-1/4 transform flex-row gap-1.5 overflow-hidden px-4 transition-all duration-300 lg:flex',
          isOpen ? 'w-full' : 'w-auto',
        )}
      >
        {isOpen && (
          <div className="flex h-full max-h-[49vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Messages area */}
            <div className="flex items-center justify-between px-3 py-2">
              <ChatHeaderButton icon={<BookOpen className="h-3.5 w-3.5" />}>
                AI Tutor
              </ChatHeaderButton>

              <div className="flex items-center gap-2">
                {hasMessages && (
                  <ChatHeaderButton
                    onClick={() => {
                      setInputValue('');
                      clearChat();
                    }}
                    icon={<Trash2 className="h-3.5 w-3.5" />}
                    className="mr-2 text-gray-500"
                  >
                    Clear
                  </ChatHeaderButton>
                )}

                <ChatHeaderButton
                  href={`/${roadmapId}/ai`}
                  target="_blank"
                  icon={<AppWindow className="h-3.5 w-3.5" />}
                  className="rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300"
                >
                  Open in new tab
                </ChatHeaderButton>

                <ChatHeaderButton
                  onClick={() => setIsOpen(false)}
                  icon={<X className="h-3.5 w-3.5" />}
                  className="rounded-md bg-red-100 px-1 py-1 text-red-500 hover:bg-red-200"
                />
              </div>
            </div>
            <div
              className="flex flex-1 flex-grow flex-col overflow-y-auto px-3 py-2"
              ref={scrollareaRef}
            >
              <div className="flex flex-col gap-2 text-sm">
                <RoadmapAIChatCard
                  role="assistant"
                  jsx={
                    <span>
                      Hey, I am your AI tutor. How can I help you today? 👋
                    </span>
                  }
                  isIntro
                />

                {/* Show default questions only when there's no chat history */}
                {aiChatHistory.length === 0 && defaultQuestions.length > 0 && (
                  <div className="mt-0.5 mb-1">
                    <p className="mb-2 text-xs font-normal text-gray-500">
                      Some questions you might have about this roadmap:
                    </p>
                    <div className="flex flex-col justify-end gap-1">
                      {defaultQuestions.map((question, index) => (
                        <button
                          key={`default-question-${index}`}
                          className="flex h-full self-start rounded-md bg-yellow-500/10 px-3 py-2 text-left text-sm text-black hover:bg-yellow-500/20"
                          onClick={() => {
                            handleChatSubmit(
                              textToJSON(question),
                              isRoadmapDetailLoading,
                            );
                          }}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

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
                ref={inputRef}
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
            className={cn(
              'relative mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 pr-8 pl-6 text-center text-white shadow-2xl transition-all duration-300 hover:scale-101 hover:bg-stone-800',
            )}
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => scrollToBottom(), 0);
            }}
          >
            {!hasMessages ? (
              <>
                <Wand2 className="h-4 w-4 text-yellow-400" />
                <span className="mr-1 text-sm font-semibold text-yellow-400">
                  AI Tutor
                </span>
                <span className={'text-white'}>Have a question? Type here</span>
              </>
            ) : (
              <>
                <MessageCirclePlus className="size-5 text-yellow-400" />
                <span className="mr-1 text-sm font-medium text-white">
                  Continue chatting..
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
}
