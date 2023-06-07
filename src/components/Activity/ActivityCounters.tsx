import { t } from '../../helpers/translate';

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
    <div class="relative flex flex-1 flex-row-reverse items-center justify-end gap-2 px-0 py-2 text-center sm:flex-col sm:gap-0 sm:px-4 sm:py-4 sm:pt-10">
      <h2 class="text-base font-bold sm:text-5xl">{count}</h2>
      <p class="mt-0 text-sm text-gray-400 sm:mt-2">{text}</p>
    </div>
  );
}

export function ActivityCounters(props: ActivityCountersType) {
  const { done, learning, streak } = props;

  return (
    <div class="mx-0 -mt-5 sm:-mx-10 md:-mt-10">
      <div class="flex flex-col gap-0 divide-x-0 divide-y border-b sm:flex-row sm:gap-2 sm:divide-x sm:divide-y-0">
        <ActivityCounter
          text={t('topicsCompleted')}
          count={`${done?.total || 0}`}
        />

        <ActivityCounter
          text={t('currentlyLearning')}
          count={`${learning?.total || 0}`}
        />

        <ActivityCounter
          text={t('visitStreak')}
          count={`${streak?.count || 0}d`}
        />
      </div>
    </div>
  );
}
