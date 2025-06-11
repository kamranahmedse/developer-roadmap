import './RoadmapAIChat.css';

import { useQuery } from '@tanstack/react-query';
import { roadmapJSONOptions } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Bot,
  Frown,
  Loader2Icon,
  LockIcon,
  PauseCircleIcon,
  SendIcon,
} from 'lucide-react';
import { ChatEditor } from '../ChatEditor/ChatEditor';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { isLoggedIn } from '../../lib/jwt';
import type { JSONContent, Editor } from '@tiptap/core';
import { flushSync } from 'react-dom';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { useToast } from '../../hooks/use-toast';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { ChatRoadmapRenderer } from './ChatRoadmapRenderer';
import { RoadmapAIChatCard } from './RoadmapAIChatCard';
import { RoadmapAIChatHeader } from './RoadmapAIChatHeader';
import { showLoginPopup } from '../../lib/popup';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { billingDetailsOptions } from '../../queries/billing';
import { TopicDetail } from '../TopicDetail/TopicDetail';
import { slugify } from '../../lib/slugger';
import { AIChatActionButtons } from './AIChatActionButtons';
import { cn } from '../../lib/classname';
import {
  getTailwindScreenDimension,
  type TailwindScreenDimensions,
} from '../../lib/is-mobile';
import { ChatPersona } from '../UserPersona/ChatPersona';
import { userRoadmapPersonaOptions } from '../../queries/user-persona';
import { UpdatePersonaModal } from '../UserPersona/UpdatePersonaModal';
import { lockBodyScroll } from '../../lib/dom';
import { TutorIntroMessage } from './TutorIntroMessage';
import {
  roadmapAIChatRenderer,
  useRoadmapAIChat,
  type RoadmapAIChatHistoryType,
} from '../../hooks/use-roadmap-ai-chat';
import { chatHistoryOptions } from '../../queries/chat-history';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';

export type RoadmapAIChatTab = 'chat' | 'topic';

type RoadmapAIChatProps = {
  roadmapId: string;
};

export function RoadmapAIChat(props: RoadmapAIChatProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const editorRef = useRef<Editor | null>(null);
  const scrollareaRef = useRef<HTMLDivElement>(null);

  const [deviceType, setDeviceType] = useState<TailwindScreenDimensions>();

  useLayoutEffect(() => {
    setDeviceType(getTailwindScreenDimension());
  }, []);

  const [isChatMobileVisible, setIsChatMobileVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedTopicTitle, setSelectedTopicTitle] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<RoadmapAIChatTab>('chat');
  const [activeChatHistoryId, setActiveChatHistoryId] = useState<
    string | undefined
  >();

  const [showUpdatePersonaModal, setShowUpdatePersonaModal] = useState(false);

  const { data: roadmapDetail, error: roadmapDetailError } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );
  const { data: roadmapTreeData, isLoading: roadmapTreeLoading } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );

  const { isLoading: userResourceProgressLoading } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const { data: tokenUsage, isLoading: isTokenUsageLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const { data: userPersona, isLoading: isUserPersonaLoading } = useQuery(
    userRoadmapPersonaOptions(roadmapId),
    queryClient,
  );

  useEffect(() => {
    lockBodyScroll(isChatMobileVisible);
  }, [isChatMobileVisible]);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  const totalTopicCount = useMemo(() => {
    const allowedTypes = ['topic', 'subtopic', 'todo'];
    return (
      roadmapDetail?.json?.nodes.filter((node) =>
        allowedTypes.includes(node.type || ''),
      ).length ?? 0
    );
  }, [roadmapDetail]);

  useEffect(() => {
    if (!roadmapDetail || !roadmapContainerRef.current) {
      return;
    }

    roadmapContainerRef.current.replaceChildren(roadmapDetail.svg);
  }, [roadmapDetail]);

  useEffect(() => {
    const params = getUrlParams();
    const queryChatId = params.chatId;

    if (!roadmapTreeData || !roadmapDetail || isUserPersonaLoading) {
      return;
    }

    if (queryChatId) {
      setIsChatHistoryLoading(true);
      setActiveChatHistoryId(queryChatId);
      deleteUrlParam('chatId');
    }

    setIsLoading(false);
  }, [roadmapTreeData, roadmapDetail, isUserPersonaLoading]);

  const onSelectTopic = useCallback(
    (topicId: string, topicTitle: string) => {
      flushSync(() => {
        setSelectedTopicId(topicId);
        setSelectedTopicTitle(topicTitle);
        setActiveTab('topic');

        if (['sm', 'md', 'lg', 'xl'].includes(deviceType || 'xl')) {
          setIsChatMobileVisible(true);
        }
      });

      const topicWithSlug = slugify(topicTitle) + '@' + topicId;
      window.dispatchEvent(
        new CustomEvent('roadmap.node.click', {
          detail: {
            resourceType: 'roadmap',
            resourceId: roadmapId,
            topicId: topicWithSlug,
            isCustomResource: false,
          },
        }),
      );
    },
    [roadmapId, deviceType],
  );

  const [isChatHistoryLoading, setIsChatHistoryLoading] = useState(true);
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
    abortControllerRef,
    handleChatSubmit,
    handleAbort,
    clearChat,
    scrollToBottom,
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

  if (roadmapDetailError) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
        <Frown className="mb-4 size-16" />
        <h1 className="mb-2 text-2xl font-bold">There was an error</h1>
        <p className="max-w-sm text-balance text-gray-500">
          {roadmapDetailError.message}
        </p>
      </div>
    );
  }

  const isDataLoading =
    isLoading ||
    roadmapTreeLoading ||
    userResourceProgressLoading ||
    isTokenUsageLoading ||
    isBillingDetailsLoading ||
    isUserPersonaLoading;

  const shouldShowChatPersona =
    !isLoading && !isUserPersonaLoading && !userPersona && isLoggedIn();

  return (
    <div className="flex flex-grow flex-row">
      <div className="relative h-full flex-grow overflow-y-scroll">
        {showUpgradeModal && (
          <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
        )}

        {showUpdatePersonaModal && (
          <UpdatePersonaModal
            roadmapId={roadmapId}
            onClose={() => setShowUpdatePersonaModal(false)}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Loader2Icon className="size-6 animate-spin stroke-[2.5]" />
          </div>
        )}

        {roadmapDetail?.json && !isLoading && (
          <div className="relative mx-auto max-w-[968px] px-4 pb-28 xl:pb-0">
            <ChatRoadmapRenderer
              roadmapId={roadmapId}
              nodes={roadmapDetail?.json.nodes}
              edges={roadmapDetail?.json.edges}
              onSelectTopic={onSelectTopic}
            />

            {/* floating chat button */}
            {!isChatMobileVisible && (
              <div className="fixed bottom-4 left-1/2 z-50 block -translate-x-1/2 xl:hidden">
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    setIsChatMobileVisible(true);
                  }}
                  className="relative w-max overflow-hidden rounded-full bg-stone-900 px-4 py-2 text-center text-white shadow-2xl hover:bg-stone-800"
                >
                  <span className="relative z-20 flex items-center gap-2 text-sm">
                    <Bot className="size-5 text-yellow-400" />
                    <span>Chat with Roadmap</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isChatMobileVisible && (
        <div
          onClick={() => {
            setIsChatMobileVisible(false);
          }}
          className="fixed inset-0 z-50 bg-black/50"
        />
      )}

      <div
        className={cn(
          'h-full flex-grow flex-col border-l border-gray-200 bg-white',
          {
            'relative hidden max-w-[40%] xl:flex': !isChatMobileVisible,
            'fixed inset-y-0 right-0 z-50 w-full max-w-[520px]':
              isChatMobileVisible,
            flex: isChatMobileVisible,
          },
        )}
      >
        <RoadmapAIChatHeader
          isLoading={isDataLoading}
          onLogin={() => {
            showLoginPopup();
          }}
          onUpgrade={() => {
            setShowUpgradeModal(true);
          }}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'topic' && selectedTopicId && selectedTopicTitle) {
              scrollToBottom();
            }
          }}
          onCloseTopic={() => {
            setSelectedTopicId(null);
            setSelectedTopicTitle(null);
            flushSync(() => {
              setActiveTab('chat');
            });
            scrollToBottom();
          }}
          onCloseChat={() => {
            setIsChatMobileVisible(false);
            setActiveTab('chat');
          }}
          selectedTopicId={selectedTopicId}
          roadmapId={roadmapId}
          activeChatHistoryId={activeChatHistoryId}
          onChatHistoryClick={(chatHistoryId) => {
            setIsChatHistoryLoading(true);
            setActiveChatHistoryId(chatHistoryId);
          }}
          onNewChat={() => {
            document.title = 'Roadmap AI Chat';
            setActiveChatHistoryId(undefined);
          }}
          onDeleteChatHistory={(chatHistoryId) => {
            if (activeChatHistoryId === chatHistoryId) {
              setActiveChatHistoryId(undefined);
            }
          }}
        />

        {activeTab === 'topic' && selectedTopicId && (
          <TopicDetail
            resourceId={selectedTopicId}
            resourceType="roadmap"
            renderer="editor"
            defaultActiveTab="content"
            hasUpgradeButtons={false}
            canSubmitContribution={false}
            wrapperClassName="grow flex flex-col overflow-y-auto"
            bodyClassName="static mx-auto h-auto grow sm:max-w-full sm:p-4"
            overlayClassName="hidden"
            closeButtonClassName="hidden"
            onClose={() => {
              setSelectedTopicId(null);
              setSelectedTopicTitle(null);
              setActiveTab('chat');
            }}
            shouldCloseOnBackdropClick={false}
            shouldCloseOnEscape={false}
          />
        )}

        {activeTab === 'chat' && (
          <>
            <div className="relative grow overflow-y-auto" ref={scrollareaRef}>
              {isLoading && <Loader />}
              {isChatHistoryLoading && (
                <Loader message="Loading chat history" />
              )}

              {shouldShowChatPersona && !isLoading && !isChatHistoryLoading && (
                <ChatPersona roadmapId={roadmapId} />
              )}

              {!isLoading &&
                !isChatHistoryLoading &&
                !shouldShowChatPersona && (
                  <div className="absolute inset-0 flex flex-col">
                    <div className="relative flex grow flex-col justify-end">
                      <div className="flex flex-col justify-end gap-2 px-3 py-2">
                        <RoadmapAIChatCard
                          role="assistant"
                          jsx={
                            <TutorIntroMessage roadmap={roadmapDetail?.json!} />
                          }
                          isIntro
                        />

                        {aiChatHistory.map(
                          (chat: RoadmapAIChatHistoryType, index: number) => {
                            return (
                              <Fragment key={`chat-${index}`}>
                                <RoadmapAIChatCard {...chat} />
                              </Fragment>
                            );
                          },
                        )}

                        {isStreamingMessage && !streamedMessage && (
                          <RoadmapAIChatCard
                            role="assistant"
                            html="Thinking..."
                          />
                        )}

                        {streamedMessage && (
                          <RoadmapAIChatCard
                            role="assistant"
                            jsx={streamedMessage}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {!isLoading && !isChatHistoryLoading && !shouldShowChatPersona && (
              <div className="flex flex-col border-t border-gray-200">
                {!isLimitExceeded && (
                  <AIChatActionButtons
                    onTellUsAboutYourSelf={() => {
                      setShowUpdatePersonaModal(true);
                    }}
                    messageCount={aiChatHistory.length}
                    showClearChat={!isPaidUser}
                    onClearChat={clearChat}
                  />
                )}

                <div className="relative flex items-start text-sm">
                  <ChatEditor
                    editorRef={editorRef}
                    roadmapId={roadmapId}
                    onSubmit={(content) => {
                      if (!isLoggedIn()) {
                        showLoginPopup();
                        return;
                      }

                      if (
                        isStreamingMessage ||
                        abortControllerRef.current ||
                        !isLoggedIn() ||
                        isDataLoading ||
                        isEmptyContent(content)
                      ) {
                        return;
                      }

                      flushSync(() => {
                        editorRef.current?.commands.setContent('<p></p>');
                      });
                      handleChatSubmit(content, isDataLoading);
                    }}
                  />

                  {isLimitExceeded && isLoggedIn() && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white">
                      <LockIcon
                        className="size-4 cursor-not-allowed"
                        strokeWidth={2.5}
                      />
                      <p className="cursor-not-allowed">
                        Limit reached for today
                        {isPaidUser ? '. Please wait until tomorrow.' : ''}
                      </p>
                      {!isPaidUser && (
                        <button
                          onClick={() => {
                            setShowUpgradeModal(true);
                          }}
                          className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
                        >
                          Upgrade for more
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    className="flex aspect-square size-[36px] items-center justify-center p-2 text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={(e) => {
                      if (!isLoggedIn()) {
                        showLoginPopup();
                        return;
                      }

                      if (isStreamingMessage || abortControllerRef.current) {
                        handleAbort();
                        return;
                      }

                      const json = editorRef.current?.getJSON();
                      if (!json || isEmptyContent(json)) {
                        toast.error('Please enter a message');
                        return;
                      }

                      flushSync(() => {
                        editorRef.current?.commands.setContent('<p></p>');
                      });

                      handleChatSubmit(json, isDataLoading);
                    }}
                  >
                    {isStreamingMessage ? (
                      <PauseCircleIcon className="size-4 stroke-[2.5]" />
                    ) : (
                      <SendIcon className="size-4 stroke-[2.5]" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function isEmptyContent(content: JSONContent) {
  if (!content) {
    return true;
  }

  // because they wrap the content in type doc
  const firstContent = content.content?.[0];
  if (!firstContent) {
    return true;
  }

  return (
    firstContent.type === 'paragraph' &&
    (!firstContent?.content || firstContent?.content?.length === 0)
  );
}

type LoaderProps = {
  message?: string;
};

function Loader(props: LoaderProps) {
  const { message } = props;

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1.5 px-3 text-sm text-gray-500">
        <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
        <span>{message ?? 'Loading Roadmap'}</span>
      </div>
    </div>
  );
}
