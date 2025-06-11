import { useQuery } from '@tanstack/react-query';
import type { JSONContent } from '@tiptap/core';
import {
  BookOpen,
  ChevronDown,
  MessageCirclePlus,
  PauseCircleIcon,
  PersonStanding,
  SendIcon,
  SquareArrowOutUpRight,
  Trash2,
  Wand2,
  X,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useKeydown } from '../../hooks/use-keydown';
import {
  roadmapAIChatRenderer,
  useRoadmapAIChat,
  type RoadmapAIChatHistoryType,
} from '../../hooks/use-roadmap-ai-chat';
import { cn } from '../../lib/classname';
import { lockBodyScroll } from '../../lib/dom';
import { slugify } from '../../lib/slugger';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { billingDetailsOptions } from '../../queries/billing';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { roadmapQuestionsOptions } from '../../queries/roadmap-questions';
import { queryClient } from '../../stores/query-client';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { RoadmapAIChatCard } from '../RoadmapAIChat/RoadmapAIChatCard';
import { CLOSE_TOPIC_DETAIL_EVENT } from '../TopicDetail/TopicDetail';
import { UpdatePersonaModal } from '../UserPersona/UpdatePersonaModal';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { chatHistoryOptions } from '../../queries/chat-history';
import { RoadmapAIChatHistory } from '../RoadmapAIChatHistory/RoadmapAIChatHistory';

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
    'flex shrink-0 items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-gray-900 min-w-8',
    className,
  );

  if (!onClick && !href) {
    return (
      <span className={classNames}>
        {icon}
        {children && <span className="hidden sm:block">{children}</span>}
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
        {children && <span className="hidden sm:block">{children}</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classNames}>
      {icon}
      {children && <span className="hidden sm:block">{children}</span>}
    </button>
  );
}

type UpgradeMessageProps = {
  onUpgradeClick?: () => void;
};

function UpgradeMessage(props: UpgradeMessageProps) {
  const { onUpgradeClick } = props;

  return (
    <div className="border-t border-gray-200 bg-black px-3 py-3">
      <div className="flex items-center gap-2.5">
        <Wand2 className="h-4 w-4 flex-shrink-0 text-white" />
        <div className="flex-1 text-sm">
          <p className="mb-1 font-medium text-white">
            You've reached your AI usage limit
          </p>
          <p className="text-xs text-gray-300">
            Upgrade to Pro for relaxed limits and advanced features
          </p>
        </div>
        <button
          className="flex-shrink-0 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-100"
          onClick={onUpgradeClick}
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}

type UsageButtonProps = {
  percentageUsed: number;
  onUpgradeClick?: () => void;
};

function UsageButton(props: UsageButtonProps) {
  const { percentageUsed, onUpgradeClick } = props;

  return (
    <button
      onClick={onUpgradeClick}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all hover:bg-yellow-200"
    >
      <div className="hidden items-center gap-1.5 sm:flex">
        <div className="h-1.5 w-6 overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              'h-full transition-all duration-300',
              percentageUsed >= 90
                ? 'bg-red-500'
                : percentageUsed >= 70
                  ? 'bg-yellow-500'
                  : 'bg-green-500',
            )}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
        <span className="text-yellow-700">{percentageUsed}% used</span>
      </div>
      <span className="font-semibold text-yellow-800 underline underline-offset-2">
        Upgrade
      </span>
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
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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

  const isAuthenticatedUser = isLoggedIn();

  const { data: tokenUsage, isLoading: isTokenUsageLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );
  const isLimitExceeded =
    isAuthenticatedUser && (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const percentageUsed = Math.round(
    ((tokenUsage?.used || 0) / (tokenUsage?.limit || 0)) * 100,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);
  const isPaidUser = userBillingDetails?.status === 'active';

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

  const [isChatHistoryLoading, setIsChatHistoryLoading] = useState(true);
  const [activeChatHistoryId, setActiveChatHistoryId] = useState<
    string | undefined
  >();
  const { data: chatHistory } = useQuery(
    chatHistoryOptions(
      activeChatHistoryId,
      roadmapAIChatRenderer({
        roadmapId,
        totalTopicCount,
        onSelectTopic,
      }),
    ),
    queryClient,
  );

  const {
    aiChatHistory,
    isStreamingMessage,
    streamedMessage,
    showScrollToBottom,
    setShowScrollToBottom,
    handleChatSubmit,
    handleAbort,
    scrollToBottom,
    clearChat,
    setAiChatHistory,
  } = useRoadmapAIChat({
    activeChatHistoryId,
    roadmapId,
    totalTopicCount,
    scrollareaRef,
    onSelectTopic,
    onChatHistoryIdChange: (chatHistoryId) => {
      setActiveChatHistoryId(chatHistoryId);
    },
  });

  useEffect(() => {
    if (!chatHistory) {
      return;
    }

    setAiChatHistory(chatHistory?.messages ?? []);
    setIsChatHistoryLoading(false);
    setTimeout(() => {
      scrollToBottom('instant');
    }, 0);
  }, [chatHistory]);

  useEffect(() => {
    if (activeChatHistoryId) {
      return;
    }

    setAiChatHistory([]);
    setIsChatHistoryLoading(false);
  }, [activeChatHistoryId, setAiChatHistory, setIsChatHistoryLoading]);

  useEffect(() => {
    lockBodyScroll(isOpen);
  }, [isOpen]);

  useKeydown('Escape', () => {
    setIsOpen(false);
  });

  useEffect(() => {
    // it means user came back to the AI chat from the topic detail
    const handleCloseTopicDetail = () => {
      lockBodyScroll(isOpen);
    };

    window.addEventListener(CLOSE_TOPIC_DETAIL_EVENT, handleCloseTopicDetail);
    return () => {
      window.removeEventListener(
        CLOSE_TOPIC_DETAIL_EVENT,
        handleCloseTopicDetail,
      );
    };
  }, [isOpen, isPersonalizeOpen]);

  function textToJSON(text: string): JSONContent {
    return {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
    };
  }

  const submitInput = () => {
    if (!isLoggedIn()) {
      setIsOpen(false);
      showLoginPopup();
      return;
    }

    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const json: JSONContent = textToJSON(trimmed);

    setInputValue('');
    handleChatSubmit(json, isRoadmapDetailLoading);
  };

  const hasMessages = aiChatHistory.length > 0;
  const newTabUrl = `/${roadmapId}/ai${activeChatHistoryId ? `?chatId=${activeChatHistoryId}` : ''}`;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black opacity-50"
        ></div>
      )}

      {showUpgradeModal && (
        <UpgradeAccountModal
          onClose={() => {
            setShowUpgradeModal(false);
          }}
        />
      )}

      {isPersonalizeOpen && (
        <UpdatePersonaModal
          roadmapId={roadmapId}
          onClose={() => {
            setIsPersonalizeOpen(false);
          }}
        />
      )}

      <div
        className={cn(
          'animate-fade-slide-up fixed bottom-5 left-1/2 z-91 max-h-[95vh] max-w-[968px] -translate-x-1/4 transform flex-col gap-1.5 overflow-hidden px-4 transition-all duration-300 sm:max-h-[50vh] lg:flex',
          isOpen ? 'h-full w-full' : 'w-auto',
        )}
      >
        {isOpen && (
          <>
            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex">
                  <ChatHeaderButton
                    icon={<BookOpen className="h-3.5 w-3.5" />}
                    className="text-sm"
                  >
                    AI Tutor
                  </ChatHeaderButton>
                </div>

                <div className="flex gap-1.5">
                  <ChatHeaderButton
                    href={newTabUrl}
                    target="_blank"
                    icon={<SquareArrowOutUpRight className="h-3.5 w-3.5" />}
                    className="hidden rounded-md py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300 sm:flex"
                  >
                    Open in new tab
                  </ChatHeaderButton>

                  <RoadmapAIChatHistory
                    roadmapId={roadmapId}
                    activeChatHistoryId={activeChatHistoryId}
                    onChatHistoryClick={(chatHistoryId) => {
                      setIsChatHistoryLoading(true);
                      setActiveChatHistoryId(chatHistoryId);
                    }}
                    onDelete={(chatHistoryId) => {
                      if (activeChatHistoryId === chatHistoryId) {
                        setActiveChatHistoryId(undefined);
                      }
                    }}
                    onNewChat={() => {
                      setActiveChatHistoryId(undefined);
                    }}
                  />

                  <ChatHeaderButton
                    onClick={() => setIsOpen(false)}
                    icon={<X className="h-3.5 w-3.5" />}
                    className="flex items-center justify-center rounded-md bg-red-100 px-1 py-1 text-red-500 hover:bg-red-200"
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
                      <span className="mt-[2px]">
                        Hey, I am your AI tutor. How can I help you today? 👋
                      </span>
                    }
                    isIntro
                  />

                  {/* Show default questions only when there's no chat history */}
                  {aiChatHistory.length === 0 &&
                    defaultQuestions.length > 0 && (
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
                                if (!isLoggedIn()) {
                                  setIsOpen(false);
                                  showLoginPopup();
                                  return;
                                }

                                if (isLimitExceeded) {
                                  setShowUpgradeModal(true);
                                  setIsOpen(false);
                                  return;
                                }

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

                  {aiChatHistory.map((chat, index) => (
                    <Fragment key={`chat-${index}`}>
                      <RoadmapAIChatCard {...chat} />
                    </Fragment>
                  ))}

                  {isStreamingMessage && !streamedMessage && (
                    <RoadmapAIChatCard role="assistant" html="Thinking..." />
                  )}

                  {streamedMessage && (
                    <RoadmapAIChatCard role="assistant" jsx={streamedMessage} />
                  )}
                </div>

                {/* Scroll to bottom button */}
                {showScrollToBottom && (
                  <button
                    onClick={() => {
                      scrollToBottom('instant');
                      setShowScrollToBottom(false);
                    }}
                    className="sticky bottom-0 mx-auto mt-2 flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg transition-all hover:bg-gray-800"
                  >
                    <ChevronDown className="h-3 w-3" />
                    Scroll to bottom
                  </button>
                )}
              </div>

              {isLimitExceeded && (
                <UpgradeMessage
                  onUpgradeClick={() => {
                    setShowUpgradeModal(true);
                    setIsOpen(false);
                  }}
                />
              )}
              {!isLimitExceeded && (
                <>
                  <div className="flex flex-row justify-between border-t border-gray-200 px-3 pt-2">
                    <div className="flex gap-2">
                      <ChatHeaderButton
                        onClick={() => {
                          if (!isLoggedIn()) {
                            setIsOpen(false);
                            showLoginPopup();
                            return;
                          }

                          setIsPersonalizeOpen(true);
                        }}
                        icon={<PersonStanding className="h-3.5 w-3.5" />}
                        className="rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300"
                      >
                        Personalize
                      </ChatHeaderButton>
                      {!isPaidUser && isAuthenticatedUser && (
                        <UsageButton
                          percentageUsed={percentageUsed}
                          onUpgradeClick={() => {
                            setShowUpgradeModal(true);
                            setIsOpen(false);
                          }}
                        />
                      )}
                    </div>
                    {hasMessages && !isPaidUser && (
                      <ChatHeaderButton
                        onClick={() => {
                          setInputValue('');
                          clearChat();
                        }}
                        icon={<Trash2 className="h-3.5 w-3.5" />}
                        className="rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300"
                      >
                        Clear
                      </ChatHeaderButton>
                    )}
                  </div>
                  <div className="relative flex items-center text-sm">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      autoFocus
                      disabled={isLimitExceeded}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (isStreamingMessage) {
                            return;
                          }
                          submitInput();
                        }
                      }}
                      placeholder={
                        isLimitExceeded
                          ? 'You have reached the usage limit for today..'
                          : 'Ask me anything about this roadmap...'
                      }
                      className={cn(
                        'w-full resize-none px-3 py-4 outline-none',
                        isLimitExceeded && 'bg-gray-100 text-gray-400',
                      )}
                    />

                    <button
                      className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-zinc-500 hover:text-black disabled:opacity-50"
                      disabled={isRoadmapDetailLoading || isLimitExceeded}
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
                </>
              )}
            </div>
          </>
        )}

        {!isOpen && (
          <button
            className={cn(
              'relative mx-auto flex w-max flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 pr-8 pl-6 text-center text-white shadow-2xl transition-all duration-300 hover:scale-101 hover:bg-stone-800',
            )}
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => {
                scrollToBottom('instant');
                setShowScrollToBottom(false);
              }, 0);
            }}
          >
            {!hasMessages ? (
              <>
                <Wand2 className="h-4 w-4 text-yellow-400" />
                <span className="mr-1 text-sm font-semibold text-yellow-400">
                  AI Tutor
                </span>
                <span className={'hidden text-white sm:block'}>
                  Have a question? Type here
                </span>
                <span className={'block text-white sm:hidden'}>
                  Ask anything
                </span>
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
