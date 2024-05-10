import { useState } from 'react';
import { cn } from '../../lib/classname';

type ActivityTopicTitlesProps = {
  topicTitles: string[];
  className?: string;
  onSelectActivity?: () => void;
};

export function ActivityTopicTitles(props: ActivityTopicTitlesProps) {
  const { topicTitles, onSelectActivity, className } = props;

  const [showAll, setShowAll] = useState(false);
  const filteredTopicTitles = topicTitles.slice(
    0,
    showAll ? topicTitles.length : 3,
  );

  const shouldShowButton = topicTitles.length > 3;

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1 text-sm font-normal text-gray-600',
        className,
      )}
    >
      {filteredTopicTitles.map((topicTitle, index) => (
        <span key={index} className="rounded-md bg-gray-200 px-1.5">
          {topicTitle}
        </span>
      ))}
      {shouldShowButton && !showAll && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-white border border-black text-black rounded-md px-1.5 hover:bg-black text-xs h-[20px] hover:text-white"
        >
          {showAll ? '- Show less' : `+${topicTitles.length - 3}`}
        </button>
      )}
    </div>
  );
}
