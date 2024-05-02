type ActivityTopicTitlesProps = {
  topicTitles: string[];
  onSelectActivity?: () => void;
};

export function ActivityTopicTitles(props: ActivityTopicTitlesProps) {
  const { topicTitles, onSelectActivity } = props;
  const firstThreeTopics = topicTitles?.slice(0, 3);
  const remainingTopics = topicTitles?.slice(3);

  return (
    <>
      {firstThreeTopics.map((topicTitle, index) => {
        return (
          <span>
            <>
              {topicTitles.length > 3 && index === 2
                ? `${topicTitle}, `
                : index === 2
                  ? `and ${topicTitle}`
                  : `${topicTitle}, `}
            </>
          </span>
        );
      })}

      {remainingTopics?.length > 0 && (
        <>
          and
          <button
            className="font-medium underline underline-offset-2 hover:text-black"
            onClick={onSelectActivity}
          >
            {remainingTopics.length} more topic
            {remainingTopics.length > 1 ? 's' : ''}
          </button>
        </>
      )}
    </>
  );
}
