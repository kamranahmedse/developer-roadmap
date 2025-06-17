import type { RoadmapAIChatHistoryType } from './RoadmapAIChat';
import { cn } from '../../lib/classname';
import { BotIcon, User2Icon } from 'lucide-react';

type RoadmapAIChatCardProps = RoadmapAIChatHistoryType & {
  isIntro?: boolean;
};

export function RoadmapAIChatCard(props: RoadmapAIChatCardProps) {
  const { role, html, jsx, isIntro = false } = props;

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

        {!!jsx && jsx}

        {!!html && (
          <div
            className="course-content course-ai-content prose prose-sm mt-0.5 w-full max-w-[calc(100%-38px)] overflow-hidden text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
