import './RoadmapAIChat.css';

import { useQuery } from '@tanstack/react-query';
import {
  roadmapDetailsOptions,
  roadmapJSONOptions,
} from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BotIcon, Loader2Icon, PauseCircleIcon, SendIcon } from 'lucide-react';
import { ChatEditor } from '../ChatEditor/ChatEditor';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import {
  AIChatCard,
  type AllowedAIChatRole,
} from '../GenerateCourse/AICourseLessonChat';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import type { JSONContent, Editor } from '@tiptap/core';
import { flushSync } from 'react-dom';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { markdownToHtmlWithHighlighting } from '../../lib/markdown';
import { readStream } from '../../lib/ai';
import { useToast } from '../../hooks/use-toast';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { ChatRoadmapRenderer } from './ChatRoadmapRenderer';
import {
  renderMessage,
  type MessagePartRenderer,
} from '../../lib/render-chat-message';
import { RoadmapAIChatCard } from './RoadmapAIChatCard';
import { UserProgressList } from './UserProgressList';
import { UserProgressActionList } from './UserProgressActionList';
import { RoadmapTopicList } from './RoadmapTopicList';
import { ShareResourceLink } from './ShareResourceLink';
import { RoadmapRecommendations } from './RoadmapRecommendations';

export type RoamdapAIChatHistoryType = {
  role: AllowedAIChatRole;
  isDefault?: boolean;

  // these two will be used only into the backend
  // for transforming the raw message into the final message
  content?: string;
  json?: JSONContent;

  // these two will be used only into the frontend
  // for rendering the message
  html?: string;
  jsx?: React.ReactNode;
};

type RoadmapAIChatProps = {
  roadmapId: string;
};

export function RoadmapAIChat(props: RoadmapAIChatProps) {
  const { roadmapId } = props;

  const toast = useToast();
  const editorRef = useRef<Editor | null>(null);
  const scrollareaRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [aiChatHistory, setAiChatHistory] = useState<
    RoamdapAIChatHistoryType[]
  >([]);
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] =
    useState<React.ReactNode | null>(null);

  const { data: roadmapDetailsData } = useQuery(
    roadmapDetailsOptions(roadmapId),
    queryClient,
  );

  const { data: roadmapJSONData } = useQuery(
    roadmapJSONOptions(roadmapId),
    queryClient,
  );
  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );

  const { data: userResourceProgressData } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const roadmapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roadmapJSONData || !roadmapContainerRef.current) {
      return;
    }

    roadmapContainerRef.current.replaceChildren(roadmapJSONData.svg);
  }, [roadmapJSONData]);

  useEffect(() => {
    if (!roadmapTreeData || !roadmapJSONData || !roadmapDetailsData) {
      return;
    }

    setIsLoading(false);
  }, [roadmapTreeData, roadmapJSONData, roadmapDetailsData]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const handleChatSubmit = (json: JSONContent) => {
    if (
      !json ||
      isStreamingMessage ||
      !isLoggedIn() ||
      isLoading ||
      abortControllerRef.current
    ) {
      return;
    }

    abortControllerRef.current = new AbortController();

    const html = htmlFromTiptapJSON(json);
    const newMessages: RoamdapAIChatHistoryType[] = [
      ...aiChatHistory,
      {
        role: 'user',
        json,
        html,
      },
    ];

    flushSync(() => {
      setAiChatHistory(newMessages);
      editorRef.current?.commands.setContent('<p></p>');
    });

    scrollToBottom();
    completeAITutorChat(newMessages, abortControllerRef.current);
  };

  const scrollToBottom = useCallback(() => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollareaRef]);

  const renderer: Record<string, MessagePartRenderer> = useMemo(() => {
    return {
      'user-progress': () => {
        return <UserProgressList roadmapId={roadmapId} />;
      },
      'update-progress': (options) => {
        return <UserProgressActionList roadmapId={roadmapId} {...options} />;
      },
      'roadmap-topics': (options) => {
        return <RoadmapTopicList roadmapId={roadmapId} {...options} />;
      },
      'resource-progress-link': () => {
        return <ShareResourceLink roadmapId={roadmapId} />;
      },
      'roadmap-recommendations': (options) => {
        return <RoadmapRecommendations roadmapId={roadmapId} {...options} />;
      },
    };
  }, [roadmapId]);

  const completeAITutorChat = async (
    messages: RoamdapAIChatHistoryType[],
    abortController?: AbortController,
  ) => {
    try {
      setIsStreamingMessage(true);

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-chat-roadmap`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          signal: abortController?.signal,
          body: JSON.stringify({
            roadmapId,
            messages: messages.slice(-10),
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();

        toast.error(data?.message || 'Something went wrong');
        setAiChatHistory([...messages].slice(0, messages.length - 1));
        setIsStreamingMessage(false);

        if (data.status === 401) {
          removeAuthToken();
          window.location.reload();
        }

        queryClient.invalidateQueries(getAiCourseLimitOptions());
        return;
      }

      const reader = response.body?.getReader();

      if (!reader) {
        setIsStreamingMessage(false);
        toast.error('Something went wrong');
        return;
      }

      await readStream(reader, {
        onStream: async (content) => {
          if (abortController?.signal.aborted) {
            return;
          }

          const jsx = await renderMessage(content, renderer);

          flushSync(() => {
            setStreamedMessage(jsx);
          });

          scrollToBottom();
        },
        onStreamEnd: async (content) => {
          if (abortController?.signal.aborted) {
            return;
          }

          const jsx = await renderMessage(content, renderer);
          const newMessages: RoamdapAIChatHistoryType[] = [
            ...messages,
            {
              role: 'assistant',
              content,
              jsx,
            },
          ];

          flushSync(() => {
            setStreamedMessage(null);
            setIsStreamingMessage(false);
            setAiChatHistory(newMessages);
          });

          queryClient.invalidateQueries(getAiCourseLimitOptions());
          scrollToBottom();
        },
      });

      setIsStreamingMessage(false);
      abortControllerRef.current = null;
    } catch (error) {
      setIsStreamingMessage(false);
      setStreamedMessage(null);
      abortControllerRef.current = null;

      if (abortController?.signal.aborted) {
        return;
      }
      toast.error('Something went wrong');
    }
  };

  const handleAbort = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreamingMessage(false);
    setStreamedMessage(null);
    setAiChatHistory([...aiChatHistory].slice(0, aiChatHistory.length - 1));
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="grid grow grid-cols-5">
      <div className="relative col-span-3 h-full overflow-y-scroll">
        {isLoading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Loader2Icon className="size-6 animate-spin stroke-[2.5]" />
          </div>
        )}
        {roadmapJSONData?.json && !isLoading && (
          <ChatRoadmapRenderer
            roadmapId={roadmapId}
            nodes={roadmapJSONData?.json.nodes}
            edges={roadmapJSONData?.json.edges}
          />
        )}
      </div>

      <div className="col-span-2 flex h-full flex-col border-l border-gray-200 bg-white">
        <div className="flex min-h-[46px] items-center justify-between gap-2 border-b border-gray-200 px-3 py-2 text-sm">
          <span className="flex items-center gap-2 text-sm">
            <BotIcon className="size-4 shrink-0 text-black" />
            <span>AI Chat</span>
          </span>
        </div>

        <div className="relative grow overflow-y-auto" ref={scrollareaRef}>
          {isLoading && (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1.5 px-3 text-sm text-gray-500">
                <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
                <span>Loading Roadmap</span>
              </div>
            </div>
          )}

          {!isLoading && (
            <div className="absolute inset-0 flex flex-col">
              <div className="relative flex grow flex-col justify-end">
                <div className="flex flex-col justify-end gap-2 px-3 py-2">
                  {aiChatHistory.map((chat, index) => {
                    return (
                      <Fragment key={`chat-${index}`}>
                        <RoadmapAIChatCard {...chat} />
                      </Fragment>
                    );
                  })}

                  {isStreamingMessage && !streamedMessage && (
                    <RoadmapAIChatCard role="assistant" html="Thinking..." />
                  )}

                  {streamedMessage && (
                    <RoadmapAIChatCard role="assistant" jsx={streamedMessage} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <form
          className="relative flex items-start border-t border-gray-200 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (isStreamingMessage && abortControllerRef.current) {
              handleAbort();
              return;
            }

            handleChatSubmit(editorRef.current?.getJSON() || {});
          }}
        >
          <ChatEditor
            editorRef={editorRef}
            roadmapId={roadmapId}
            onSubmit={(content) => {
              if (isStreamingMessage && abortControllerRef.current) {
                handleAbort();
                return;
              }

              handleChatSubmit(content);
            }}
          />

          <button
            type="submit"
            className="flex aspect-square size-[36px] items-center justify-center p-2 text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isStreamingMessage ? (
              <PauseCircleIcon className="size-4 stroke-[2.5]" />
            ) : (
              <SendIcon className="size-4 stroke-[2.5]" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export function htmlFromTiptapJSON(json: JSONContent) {
  const content = json.content;

  let text = '';
  for (const child of content || []) {
    switch (child.type) {
      case 'text':
        text += child.text;
        break;
      case 'paragraph':
        text += `<p>${htmlFromTiptapJSON(child)}</p>`;
        break;
      case 'variable':
        const label = child?.attrs?.label || '';
        text += `<span class="chat-variable">${label}</span>`;
        break;
      default:
        break;
    }
  }

  return text;
}
