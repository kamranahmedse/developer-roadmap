type ActivityCountersType = {
  done: {
    today: number;
    total: number;
  };
  learning: {
    today: number;
    total: number;
  };
  streak: {
    count: number;
  };
};

type ActivityCounterType = {
  text: string;
  count: string;
};

function ActivityCounter(props: ActivityCounterType) {
  const { text, count } = props;

  return (
    <div class="relative flex flex-1 flex-row-reverse sm:flex-col px-0 sm:px-4 py-2 sm:py-4 text-center sm:pt-10 items-center gap-2 sm:gap-0 justify-end">
      <h2 class="text-base sm:text-5xl font-bold">
        {count}
      </h2>
      <p class="mt-0 sm:mt-2 text-sm text-gray-400">{text}</p>
    </div>
  );
}

export function ActivityCounters(props: ActivityCountersType) {
  const { done, learning, streak } = props;

  return (
    <div class="mx-0 -mt-5 sm:-mx-10 md:-mt-10">
      <div class="flex flex-col sm:flex-row gap-0 sm:gap-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x border-b">
        <ActivityCounter
          text={'Topics Completed'}
          count={`${done?.total || 0}`}
        />

        <ActivityCounter
          text={'Currently Learning'}
          count={`${learning?.total || 0}`}
        />

        <ActivityCounter
          text={'Visit Streak'}
          count={`${streak?.count || 0}d`}
        />
      </div>
    </div>
  );
}
