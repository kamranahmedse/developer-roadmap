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
          <span className="font-medium">
            <>
              {index > 0 && ', '}
              {index === firstThreeTopics.length - 1 &&
                firstThreeTopics.length > 1 &&
                'and '}
              {topicTitle}
            </>
          </span>
        );
      })}

      {remainingTopics?.length > 0 && (
        <>
          &nbsp;and&nbsp;
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
