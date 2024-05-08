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
        <span key={index} className="rounded-md bg-gray-200 px-1">
          {topicTitle}
        </span>
      ))}
      {shouldShowButton && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-gray-600 underline underline-offset-2 hover:text-black"
        >
          {showAll ? '- Show less' : `+${topicTitles.length - 3} more`}
        </button>
      )}
    </div>
  );
}
