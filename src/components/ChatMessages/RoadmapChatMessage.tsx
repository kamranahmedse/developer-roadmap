import { Markdown } from '../Global/Markdown';
import { BotIcon, User2Icon } from 'lucide-react';
import type { UIMessage } from 'ai';
import { parseMessageParts } from '../../lib/message-part';
import { RoadmapChatUserProgressList } from './UserProgressList';
import {
  parseUserProgress,
  UserProgressActionList,
} from './UserPrgressActionList';
import { parseTopicList, RoadmapTopicList } from './RoadmapTopicList';
import { ShareResourceLink } from './ShareResourceLink';
import {
  parseRoadmapSlugList,
  RoadmapRecommendations,
} from './RoadmapRecommendations';
import { cn } from '../../lib/classname';

type RoadmapMessageProps = {
  roadmapId: string;
  message: UIMessage;
  isStreaming: boolean;
  children?: React.ReactNode;
  onTopicClick?: (topicId: string, topicTitle: string) => void;
};

export function RoadmapChatMessage(props: RoadmapMessageProps) {
  const { roadmapId, message, isStreaming, children, onTopicClick } = props;
  const { role } = message;

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg',
        role === 'user' ? 'bg-gray-300/30' : 'bg-yellow-500/30',
      )}
    >
      <div className="flex items-start gap-2.5 p-3">
        <div
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full',
            role === 'user'
              ? 'bg-gray-200 text-black'
              : 'bg-yellow-400 text-black',
          )}
        >
          {role === 'user' ? (
            <User2Icon className="size-4 stroke-[2.5]" />
          ) : (
            <BotIcon className="size-4 stroke-[2.5]" />
          )}
        </div>

        {children || (
          <div>
            {message.parts.map((part) => {
              const { type } = part;

              if (role === 'user' && type === 'text') {
                return (
                  <div
                    key={`message-${message.id}-part-${type}`}
                    className="prose prose-sm message-markdown max-w-full text-sm"
                    dangerouslySetInnerHTML={{ __html: part.text ?? '' }}
                  />
                );
              }

              if (type === 'text') {
                const text = part.text;
                const parts = parseMessageParts(text, {
                  'user-progress': () => {
                    return {};
                  },
                  'update-progress': (opts) => {
                    return parseUserProgress(opts.content);
                  },
                  'roadmap-topics': (opts) => {
                    return parseTopicList(opts.content);
                  },
                  'resource-progress-link': () => {
                    return {};
                  },
                  'roadmap-recommendations': (opts) => {
                    return parseRoadmapSlugList(opts.content);
                  },
                });

                return parts.map((part, index) => {
                  const { type } = part;
                  const key = `message-${message.id}-part-${type}-${index}`;

                  if (type === 'text') {
                    return (
                      <Markdown
                        key={key}
                        className="prose prose-sm message-markdown max-w-full text-sm"
                      >
                        {part.text ?? ''}
                      </Markdown>
                    );
                  } else if (type === 'user-progress') {
                    return (
                      <RoadmapChatUserProgressList
                        key={key}
                        roadmapId={roadmapId}
                      />
                    );
                  } else if (type === 'update-progress') {
                    return (
                      <UserProgressActionList
                        key={key}
                        roadmapId={roadmapId}
                        updateUserProgress={part.data}
                        isLoading={isStreaming}
                      />
                    );
                  } else if (type === 'roadmap-topics') {
                    return (
                      <RoadmapTopicList
                        key={key}
                        roadmapId={roadmapId}
                        topics={part.data}
                        onTopicClick={onTopicClick}
                      />
                    );
                  } else if (type === 'resource-progress-link') {
                    return (
                      <ShareResourceLink key={key} roadmapId={roadmapId} />
                    );
                  } else if (type === 'roadmap-recommendations') {
                    return (
                      <RoadmapRecommendations
                        key={key}
                        roadmapSlugs={part.data}
                      />
                    );
                  }

                  return null;
                });
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
